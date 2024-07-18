import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import postsRoutes from "./routes/posts.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const { MONGO_URL, APP_PORT } = process.env;

const app: Express = express();
const PORT = APP_PORT || 5000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", postsRoutes);

const startApplication = async () => {
    if (!MONGO_URL) {
        throw new Error("MONGO_URL is not defined in the environment variables");
    }
    // Connect to MongoDB
    await mongoose
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB is connected successfully"))
        .catch((err) => console.error(err));

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

startApplication();
