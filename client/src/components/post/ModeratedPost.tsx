import { FC } from "react";
import Tags from "./Tags";
import { formatDate } from "../../utils/post.utils";
import { Link } from "react-router-dom";
import ModeratedPostAdminControls from "./ModeratedPostAdminControls";

interface ModeratedPostProps {
    title: string;
    id: string;
    authorEmail: string;
    tags?: string[];
    createdAt: string;
    checks: number;
    message?: string;
}

const ModeratedPost: FC<ModeratedPostProps> = ({ title, id, tags, createdAt, authorEmail, checks, message }) => {
    return (
        <div className="flex gap-2 w-full p-1 items-center">
            <div className="flex-1">
                {tags && <Tags tags={tags} />}
                <h1 className="text-green font-serif text-[32px] max-md:text-2xl w-full">{title}</h1>
                <div className="flex gap-1 flex-wrap">
                    <p>| {formatDate(createdAt)} |</p>
                    <p>Author: {authorEmail} |</p>
                    <p>Checks: {checks} |</p>
                    <Link to={`/post/moderated/${id}`} className="text-green hover:underline text-lg">
                        Link to post
                    </Link>
                </div>
                {message && <p>Last message for correction: {message}</p>}
            </div>
            <ModeratedPostAdminControls postId={id} />
        </div>
    );
};

export default ModeratedPost;
