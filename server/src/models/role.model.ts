import { model, Schema } from "mongoose";

interface RoleI {
    value: string;
}

const roleSchema = new Schema<RoleI>({
    value: {
        type: String,
        unique: true,
        default: "USER",
    },
});

export const Role = model<RoleI>("Role", roleSchema);
