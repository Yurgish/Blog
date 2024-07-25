import { NextFunction, Request, Response } from "express";
import { TokenRequest } from "./auth.middleware";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRoles = (req as TokenRequest).token.role;
        if (!userRoles.includes("ADMIN")) {
            return res.status(403).json({ message: "You have no rights for this route" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "User is not logged in" });
    }
};
