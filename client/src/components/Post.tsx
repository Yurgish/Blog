import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { addHashtags, isAuthorOfPost, transformEmail } from "../utils/post.utils";
import UpdatePostControls from "./UpdatePostControls";
import { useAppSelector } from "../hooks/store.hooks";

interface PostProps {
    title: string;
    summary: string;
    id: string;
    authorEmail: string;
    tags?: string[];
    createdAt: string;
}

const Post: FC<PostProps> = ({ title, summary, id, tags, createdAt, authorEmail }) => {
    const user = useAppSelector((state) => state.userReducer.user);
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();

    return (
        <div className="grid gap-4 grid-cols-[auto_1fr] max-sm:grid-cols-1 max-sm:gap-0">
            <div className="text-white flex flex-col items-end max-sm:flex-row max-sm:justify-between">
                <h1 className="font-semibold text-[32px] text-right uppercase max-md:text-2xl max-sm:hidden">
                    {day} <br /> {month}
                </h1>
                <h1 className="font-semibold uppercase text-base hidden max-sm:block">
                    {day} {month} {year}
                </h1>
                <p className="[writing-mode:vertical-lr] transform -rotate-180 text-base font-light max-sm:-rotate-0 max-sm:[writing-mode:horizontal-tb]">
                    {transformEmail(authorEmail)}
                </p>
            </div>
            <div className="w-[890px] max-lg:w-full max-sm:order-first max-sm:mb-4">
                <h1 className="text-green font-serif text-[32px] mb-5 max-md:text-2xl w-full max-sm:mb-4">{title}</h1>
                <p className="text-white text-lg max-md:text-base">
                    {summary}{" "}
                    <Link to={`/post/${id}`} className="text-green hover:underline">
                        ...read more
                    </Link>
                </p>
            </div>
            <div className="col-start-2 max-sm:col-start-1 flex justify-between mt-3 items-center">
                <div className="flex gap-2">
                    {tags &&
                        addHashtags(tags).map((tag, index) => (
                            <div
                                key={index}
                                className="text-green text-sm border-green border px-[18px] py-1 rounded-full max-md:text-xs"
                            >
                                {tag}
                            </div>
                        ))}
                </div>
                {user && isAuthorOfPost(user.email, authorEmail) && <UpdatePostControls postId={id} />}
            </div>
        </div>
    );
};

export default Post;
