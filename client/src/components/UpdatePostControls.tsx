import React, { FC } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { postsApi } from "../services/posts.service";

interface UpdatePostControlsProps {
    postId: string;
}

const UpdatePostControls: FC<UpdatePostControlsProps> = ({ postId }) => {
    const [deletePostTrigger] = postsApi.useDeletePostMutation();
    return (
        <div className="flex gap-2">
            <Link to={`/edit-post/${postId}`}>
                <MdOutlineEdit className="fill-green text-xl" />
            </Link>
            <button onClick={() => deletePostTrigger(postId)}>
                <MdDeleteOutline className="fill-red text-xl" />
            </button>
        </div>
    );
};

export default UpdatePostControls;
