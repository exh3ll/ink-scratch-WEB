import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import z from "zod";
import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";

let userService = new UserService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            // Validate request body
            const parsedData = CreateUserDTO.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json({
                    success: false,
                    message: z.prettifyError(parsedData.error)
                });
            }
            
            const userData: CreateUserDTO = parsedData.data;
            
            // ✅ UPDATED: Now receives {token, user} from createUser
            const { token, user } = await userService.createUser(userData);
            
            // ✅ UPDATED: Return token along with user data
            return res.status(201).json({
                success: true,
                message: "User Created",
                data: user,
                token  // ✅ Now includes token!
            });
            
        } catch (error: Error | any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal Service Error"
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const parsedData = LoginUserDTO.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json({
                    success: false,
                    message: z.prettifyError(parsedData.error)
                });
            }
            
            const loginData: LoginUserDTO = parsedData.data;
            const { token, user } = await userService.loginUser(loginData);
            
            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: user,
                token
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }
}