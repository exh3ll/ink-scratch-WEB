import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authorizeUser } from "../middlewares/authorized.middleware";

let authController = new AuthController();
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected route - requires authentication
router.put("/update-profile", authorizeUser, authController.updateProfile);

export default router;