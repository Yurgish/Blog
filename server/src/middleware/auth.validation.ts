import { body } from "express-validator";
import { User } from "../models/user.model";
import { validationResultHandler } from "../utils/validationResultHandler";
const bcrypt = require("bcrypt");

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
    validationResultHandler,
];

export const loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email")
        .custom(async (email, { req }) => {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                throw new Error("Invalid email");
            }
            req.user = existingUser;
        }),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .custom(async (password, { req }) => {
            if (req.user) {
                const isValidPassword = bcrypt.compareSync(password, req.user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }
            }
        }),
    validationResultHandler,
];
