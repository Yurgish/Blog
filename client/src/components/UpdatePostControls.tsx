import React, { FC } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

interface UpdatePostControlsProps {
    postId: string;
}

const UpdatePostControls: FC<UpdatePostControlsProps> = ({ postId }) => {
    const handlePostDelete = () => {};
    return (
        <div className="flex gap-2">
            <Link to={`/edit-post/${postId}`}>
                <MdOutlineEdit className="fill-green text-xl" />
            </Link>
            <button onClick={handlePostDelete}>
                <MdDeleteOutline className="fill-red text-xl" />
            </button>
        </div>
    );
};

export default UpdatePostControls;
