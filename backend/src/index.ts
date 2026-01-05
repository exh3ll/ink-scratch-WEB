import express, { Request, Response } from "express";
import { connectDB } from "./database/mongodb";
import authRoutes from "./routes/auth.route";
import { PORT } from "./config";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Foodify Auth API is running!" });
});

app.use("/api/auth", authRoutes);

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

start();

start();