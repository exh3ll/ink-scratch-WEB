import { UserModel, IUser } from "../models/user.model";

export interface IUserRepository {
    createUser(userData: Partial<IUser>): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser |null>;
    getUserByUsername(Username: string): Promise<IUser |null>;
    // Additional
    getUserById(id: string): Promise<IUser | null>;
    getAllUsers() : Promise<IUser[]>;
    updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(id: string): Promise<boolean>;
}

// MongoDB implementation of USerRepository
export class UserRepository implements IUserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        return await user.save();
    }
    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({"email" : email});
        return user;
    }
    async getUserByUsername(Username: string): Promise<IUser | null> {
        const user = await UserModel.findOne({"username": Username});
        return user;
    }
    async getUserById(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id);
        return user;
    }
    async getAllUsers(): Promise<IUser[]> {
        const users = await UserModel.find();
        return users;
    }

    // Updated method to handle profilePicture and bio update
    async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        // Update the user with new data (e.g., profile picture or bio)
        const updatedUser = await UserModel.findByIdAndUpdate(
            id, updateData, { new: true } // Return the updated user document
        );
        return updatedUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return result ? true : false;
    }
}
