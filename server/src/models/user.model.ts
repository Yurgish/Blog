import { Document, model, Schema } from "mongoose";

export interface IUserDocument extends Document {
    login: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
}

const userSchema = new Schema<IUserDocument>({
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

export const User = model<IUserDocument>("User", userSchema);
