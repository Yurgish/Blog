import { Request, Response } from "express";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

// Винести всю логіку валідації в midleware

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
        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Registration error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { login, email, password } = req.body;
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
        res.status(200).json({ message: "User logged successfully", token });
        console.log(JWT_SECRET);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Login error" });
    }
};
