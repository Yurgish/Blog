import { model, Schema } from "mongoose";

interface UserI {
    login: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
}

const userSchema = new Schema<UserI>({
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

export const User = model<UserI>("User", userSchema);
