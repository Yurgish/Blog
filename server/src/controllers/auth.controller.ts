import { Request, Response } from "express";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
const bcrypt = require("bcrypt");

// Винести всю логіку валідації в midleware

export const register = async (req: Request, res: Response) => {
    try {
        const { login, email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

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
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Login error" });
    }
};
