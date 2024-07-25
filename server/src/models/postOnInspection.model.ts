import { Document, model, Schema } from "mongoose";
import { IPostDocument, postSchema } from "./post.model";

interface IModerationPostDocument extends Document {
    post: IPostDocument;
    checks: number;
    isRefused: boolean;
    adminMessage: string;
}

const embeddedPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        _id: false,
        timestamps: false,
    }
);

const moderationPostSchema = new Schema<IModerationPostDocument>(
    {
        post: {
            type: embeddedPostSchema,
            required: true,
        },
        checks: {
            type: Number,
            default: 0,
        },
        isRefused: {
            type: Boolean,
            default: false,
        },
        adminMessage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const ModerationPost = model<IModerationPostDocument>("ModerationPost", moderationPostSchema);
