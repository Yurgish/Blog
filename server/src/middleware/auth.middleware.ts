import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export interface TokenRequest extends Request {
    token: JwtPayload;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ message: "User is not logged in" });
        }
        const decodedToken = jwt.verify(token, JWT_SECRET || "placeholder") as JwtPayload;
        (req as TokenRequest).token = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "User is not logged in" });
    }
};
