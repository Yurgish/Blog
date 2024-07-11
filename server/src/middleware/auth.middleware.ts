import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: "User is not logged in" });
        }
        const token = req.headers.authorization.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, JWT_SECRET || "placeholder");
        (req as CustomRequest).token = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "User is not logged in" });
    }
};
