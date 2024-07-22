import React, { FC, useState } from "react";
import { IPost } from "../models/postsApi.models";
import ReactQuill, { Quill } from "react-quill";
import Button from "./Button";
import "react-quill/dist/quill.snow.css";
import InputWithErrorMessages from "./InputWithErrorMessages";

const Font = Quill.import("formats/font");
Font.whitelist = ["DM-Serif-Display", "Lexend-Deca"];
Quill.register(Font, true);

interface PostFormProps {
    initialData?: IPost;
    onSubmit: (post: IPost) => void;
    buttonText: string;
    validationErrors?: Record<string, string | undefined>;
    clearError?: (field: string) => void;
}

const PostCreateAndUpdateInputs: FC<PostFormProps> = ({
    initialData,
    onSubmit,
    buttonText,
    validationErrors,
    clearError,
}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [summary, setSummary] = useState(initialData?.summary || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [tags, setTags] = useState(initialData?.tags ? initialData.tags.join(", ") : "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const post: IPost = {
            title,
            content,
            ...(summary && { summary }),
            ...(tags && { tags: tags.split(",").map((tag) => tag.trim()) }),
        };
        onSubmit(post);
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                [{ font: Font.whitelist }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
            ],
        },
    };

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            clearError?.(field);
        };

    return (
        <form className="flex flex-col gap-5 w-[1200px]">
            <InputWithErrorMessages
                type="text"
                value={title}
                onChange={handleInputChange(setTitle, "title")}
                placeholder="Title"
                errorMessage={validationErrors?.title}
            />
            <InputWithErrorMessages
                type="text"
                value={summary}
                onChange={handleInputChange(setSummary, "summary")}
                placeholder="Summary (optional)"
                errorMessage={validationErrors?.summary}
            />
            <InputWithErrorMessages
                type="text"
                value={tags}
                onChange={handleInputChange(setTags, "tags")}
                placeholder="Tags (comma separated)"
                errorMessage={validationErrors?.tags}
            />
            <ReactQuill value={content} onChange={setContent} modules={modules} className="mb-4" />
            <Button type="button" value={buttonText} onClick={handleSubmit} className="mt-8 " />
        </form>
    );
};

export default PostCreateAndUpdateInputs;
