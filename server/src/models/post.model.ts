import { Document, model, Schema } from "mongoose";

interface IPostDocument extends Document {
    title: string;
    summary: string;
    content: string;
    file: string;
    author: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPostDocument>(
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
        file: {
            type: String,
        },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);

export const Post = model<IPostDocument>("Post", postSchema);
