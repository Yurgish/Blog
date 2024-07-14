import { Request, Response } from "express";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { removeObjectFields } from "../utils/removeObjectFields";
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

export const register = async (req: Request, res: Response) => {
    try {
        const { login, email, password } = req.body;

        const hashPassword = await bcrypt.hashSync(password, 10);
        const userRole = await Role.findOne({ value: "USER" });
        if (!userRole) {
            return res.status(500).json({ message: "Default role not found" });
        }
        const newUser = new User({ login, email, password: hashPassword, roles: [userRole.value] });
        await newUser.save();
        const sanitizedUser = removeObjectFields(newUser.toObject(), ["password", "__v"]);
        res.status(201).json({ message: "User registered successfully", user: sanitizedUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Registration error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isValidPassword = await bcrypt.compareSync(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: existingUser._id, role: existingUser.roles }, JWT_SECRET || "placeholder", {
            expiresIn: "1h",
        });
        const sanitizedUser = removeObjectFields(existingUser.toObject(), ["password", "__v"]);
        res.status(200)
            .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 })
            .json({ message: "User logged successfully", user: sanitizedUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Login error" });
    }
};
