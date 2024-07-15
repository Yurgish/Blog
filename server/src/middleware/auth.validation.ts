import { Request, Response, NextFunction } from "express";
import { body, matchedData, validationResult } from "express-validator";
import { User } from "../models/user.model";

export const registerValidation = [
    body("login").notEmpty().withMessage("Login is required"),
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email")
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("Email already in use");
            }
        }),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const loginValidation = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
