import { FC, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { postsApi } from "../services/posts.service";
import AlertModal from "./ui/AlertModal";

interface UpdatePostControlsProps {
    postId: string;
}

const UpdatePostControls: FC<UpdatePostControlsProps> = ({ postId }) => {
    const [deletePostTrigger] = postsApi.useDeletePostMutation();
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex gap-2">
            <Link to={`/edit-post/${postId}`}>
                <MdOutlineEdit className="fill-green text-xl" />
            </Link>
            <button onClick={() => setIsVisible(true)}>
                <MdDeleteOutline className="fill-red text-xl" />
            </button>
            <AlertModal
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false);
                }}
                onConfirm={async () => {
                    await deletePostTrigger(postId);
                    navigate("/", { replace: true });
                }}
                confirmText="Delete"
                denyText="Cancel"
                alertText="Are you sure you want to delete this post?"
            />
        </div>
    );
};

export default UpdatePostControls;
