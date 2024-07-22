import { FC } from "react";
import { Link } from "react-router-dom";

interface PostProps {
    title: string;
    summary: string;
    id: string;
    authorEmail: string;
    tags?: string[];
    createdAt: string;
}

const Post: FC<PostProps> = ({ title, summary, id, tags, createdAt, authorEmail }) => {
    return (
        <div className="flex gap-4">
            <div className="text-white flex flex-col items-end ">
                <h1 className="font-semibold text-[32px] text-right uppercase">
                    {new Date(createdAt).getDate()} <br />{" "}
                    {new Date(createdAt).toLocaleString("eng", { month: "short" })}
                </h1>
                <p className="[writing-mode:vertical-lr] transform -rotate-180 text-base font-light">
                    {"@" + authorEmail.split("@")[0]}
                </p>
            </div>
            <div className="w-[890px]">
                <h1 className="text-green font-serif text-[32px] mb-5">{title}</h1>
                <p className="text-white text-lg">
                    {summary}
                    <Link to={`/post/${id}`} className="text-green hover:underline">
                        ...read more
                    </Link>
                </p>

                <div className="flex mt-3">
                    {tags &&
                        tags.map((tag, index) => (
                            <div
                                key={index}
                                className="text-green text-sm border-green border px-[18px] py-1 rounded-full mr-2"
                            >
                                {tag}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
