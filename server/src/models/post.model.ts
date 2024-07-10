import { model, Schema } from "mongoose";

interface PostI {
    title: string;
    summary: string;
    content: string;
    file: string;
    author: Schema.Types.ObjectId;
}

const postSchema = new Schema<PostI>(
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

export const Post = model<PostI>("Post", postSchema);
