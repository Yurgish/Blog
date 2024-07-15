import { model, Schema, Document } from "mongoose";

interface IRoleDocument extends Document {
    value: string;
}

const roleSchema = new Schema<IRoleDocument>({
    value: {
        type: String,
        unique: true,
        default: "USER",
    },
});

export const Role = model<IRoleDocument>("Role", roleSchema);
