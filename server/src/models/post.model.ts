import { Document, model, Schema } from "mongoose";

export interface IPostDocument extends Document {
    title: string;
    summary: string;
    content: string;
    tags?: string[];
    author: Schema.Types.ObjectId;
}

export const postSchema = new Schema<IPostDocument>(
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
        timestamps: true,
    }
);

export const Post = model<IPostDocument>("Post", postSchema);
