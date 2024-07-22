import { useNavigate } from "react-router-dom";
import PostCreateAndUpdateInputs from "../components/PostCreateAndUpdateInputs";
import useValidationError from "../hooks/authValidationError";
import { IPost } from "../models/postsApi.models";
import { postsApi } from "../services/posts.service";

const CreatePostPage = () => {
    const [createPostTrigger] = postsApi.useCreatePostMutation();
    const { validationErrors, clearErrors, handleServerError, clearError } = useValidationError();
    const navigate = useNavigate();

    const createPost = async (post: IPost) => {
        clearErrors();
        try {
            await createPostTrigger(post).unwrap();
            navigate("/");
        } catch (error) {
            console.log(error);
            handleServerError(error);
        }
    };
    return (
        <div className=" w-full flex justify-center">
            <PostCreateAndUpdateInputs
                buttonText="Create"
                onSubmit={createPost}
                validationErrors={validationErrors}
                clearError={clearError}
            />
        </div>
    );
};

export default CreatePostPage;
