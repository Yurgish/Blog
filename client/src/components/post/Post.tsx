import { FC } from "react";
import { Link } from "react-router-dom";
import { formatDate, transformEmail } from "../../utils/post.utils";
import Tags from "./Tags";

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
        <div className="grid gap-4 grid-cols-[auto_1fr] max-sm:grid-cols-1 max-sm:gap-0 w-full">
            <div className="text-white flex flex-col items-end max-sm:flex-row max-sm:justify-between">
                <h1 className="font-semibold text-[32px] text-right uppercase max-md:text-2xl max-sm:hidden">
                    {formatDate(createdAt, { day: true })} <br /> {formatDate(createdAt, { month: true })}
                </h1>
                <h1 className="font-semibold uppercase text-base hidden max-sm:block">{formatDate(createdAt)}</h1>
                <p className="[writing-mode:vertical-lr] transform -rotate-180 text-base font-light max-sm:-rotate-0 max-sm:[writing-mode:horizontal-tb]">
                    {transformEmail(authorEmail)}
                </p>
            </div>
            <div className="w-full max-sm:order-first max-sm:mb-4">
                <h1 className="text-green font-serif text-[32px] mb-5 max-md:text-2xl w-full max-sm:mb-4">{title}</h1>
                <p className="text-white text-lg max-md:text-base">
                    {summary}{" "}
                    <Link to={`/post/${id}`} className="text-green hover:underline">
                        ...read more
                    </Link>
                </p>
            </div>
            {tags && tags.length > 0 && (
                <div className="col-start-2 max-sm:col-start-1 flex justify-between mb-1 items-center">
                    <Tags tags={tags} />
                </div>
            )}
        </div>
    );
};

export default Post;
