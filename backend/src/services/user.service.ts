// backend/src/services/user.service.ts

import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { HttpError } from "../errors/http-error";
import { UserRepository } from "../repositories/user.repository";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { PaginationParams, PaginationResult } from "../types/pagination.type";
import crypto from "crypto";
import { EmailService } from "./email.service";
import { IUser } from "../models/user.model";

let userRepository = new UserRepository();

interface UserResponse {
    _id: string;
    email: string;
    username: string;
    fullName?: string;
    phoneNumber?: string;
    gender: 'male' | 'female' | 'other';
    role: 'user' | 'admin';
    profilePicture: string | null;
    bio?: string;
    theme: 'light' | 'dark' | 'system';
    createdAt: Date;
    updatedAt: Date;
}

export class UserService {
    private emailService = new EmailService();

    private getImageBaseUrl(): string {
        const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
        return baseUrl;
    }

    private getFullImageUrl(relativePath: string | null | undefined): string | null {
        if (!relativePath) return null;
        if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
            return relativePath;
        }
        const baseUrl = this.getImageBaseUrl();
        return `${baseUrl}/${relativePath}`;
    }

    private formatUserResponse(user: IUser): UserResponse {
        return {
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.role,
            profilePicture: this.getFullImageUrl(user.profilePicture),
            bio: user.bio,
            theme: user.theme || 'system',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async createUser(data: CreateUserDTO | any) {
        const emailCheck = await userRepository.getUserByEmail(data.email);
        if (emailCheck) {
            throw new HttpError(400, "Email already in use");
        }
        const usernameCheck = await userRepository.getUserByUsername(data.username);
        if (usernameCheck) {
            throw new HttpError(400, "Username already in use");
        }

        const hashedPassword = await bcryptjs.hash(data.password, 10);
        data.password = hashedPassword;

        const { confirmPassword, ...userDataToSave } = data;
        const newUser = await userRepository.createUser(userDataToSave);

        const payload = {
            id: newUser._id.toString(),
            email: newUser.email,
            username: newUser.username,
            fullName: newUser.fullName,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

        return { token, user: this.formatUserResponse(newUser) };
    }

    async loginUser(data: LoginUserDTO) {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new HttpError(404, "User not found");
        }

        const validPassword = await bcryptjs.compare(data.password, user.password);
        if (!validPassword) {
            throw new HttpError(401, "Invalid Credentials");
        }

        const payload = {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            role: user.role
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

        return { token, user: this.formatUserResponse(user) };
    }

    async updateProfile(data: UpdateUserDTO & { userId: string }) {
        const { userId, profilePicture, bio, theme } = data;

        const updatedUser = await userRepository.updateUser(userId, {
            profilePicture,
            bio,
            ...(theme ? { theme } : {}),
        });

        if (!updatedUser) {
            throw new HttpError(404, "User not found");
        }

        return this.formatUserResponse(updatedUser);
    }

    async updateTheme(userId: string, theme: 'light' | 'dark' | 'system'): Promise<UserResponse> {
        const updatedUser = await userRepository.updateUser(userId, { theme });

        if (!updatedUser) {
            throw new HttpError(404, "User not found");
        }

        return this.formatUserResponse(updatedUser);
    }

    async getAllUsers(): Promise<UserResponse[]> {
        const users = await userRepository.getAllUsers();
        return users.map(user => this.formatUserResponse(user));
    }

    async getUsersWithPagination(params: PaginationParams): Promise<PaginationResult<UserResponse>> {
        const result = await userRepository.getUsersWithPagination(params);
        const formattedData = result.data.map(user => this.formatUserResponse(user));
        return {
            data: formattedData,
            pagination: result.pagination,
        };
    }

    async getUserById(userId: string): Promise<UserResponse> {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return this.formatUserResponse(user);
    }

    async updateUserById(userId: string, updateData: any): Promise<UserResponse> {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }

        if (updateData.password) {
            updateData.password = await bcryptjs.hash(updateData.password, 10);
        }

        const updatedUser = await userRepository.updateUser(userId, updateData);

        if (!updatedUser) {
            throw new HttpError(500, "Failed to update user");
        }

        return this.formatUserResponse(updatedUser);
    }

    async deleteUser(userId: string): Promise<boolean> {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }

        const result = await userRepository.deleteUser(userId);
        if (!result) {
            throw new HttpError(500, "Failed to delete user");
        }
        return true;
    }

    async requestPasswordReset(email: string): Promise<void> {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            // Don't reveal whether email exists
            console.log('⚠️ Password reset requested for non-existent email:', email);
            return;
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await userRepository.saveResetToken(user._id.toString(), hashedToken, expires);

        // Always log the token to console for easy testing
        console.log('\n' + '='.repeat(80));
        console.log('🔑 PASSWORD RESET TOKEN (copy this for testing)');
        console.log('='.repeat(80));
        console.log('Email:', user.email);
        console.log('Token:', resetToken);
        console.log('Reset URL:', `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`);
        console.log('='.repeat(80) + '\n');

        // Try to send email — but don't crash the request if it fails
        try {
            await this.emailService.sendPasswordResetEmail(user.email, resetToken);
            console.log('✅ Password reset email sent to:', user.email);
        } catch (error) {
            console.error('⚠️ Email send failed (token still valid, check console above):', error);
            // Do NOT rethrow — the token is saved, user can still reset via the logged URL
        }
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userRepository.getUserByResetToken(hashedToken);
        if (!user) {
            throw new HttpError(400, 'Invalid or expired reset token');
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        await userRepository.updateUser(user._id.toString(), {
            password: hashedPassword,
        });

        await userRepository.clearResetToken(user._id.toString());

        // Try to send confirmation — don't crash if it fails
        try {
            await this.emailService.sendPasswordResetConfirmation(user.email);
        } catch (error) {
            console.error('⚠️ Confirmation email failed:', error);
        }

        console.log('✅ Password reset successful for user:', user.email);
    }

    async verifyResetToken(token: string): Promise<boolean> {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await userRepository.getUserByResetToken(hashedToken);
        return !!user;
    }
}