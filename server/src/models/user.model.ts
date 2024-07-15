import { model, Schema } from "mongoose";

export interface IUser {
    login: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            ref: "Role",
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export const User = model<IUser>("User", userSchema);
