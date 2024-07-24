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
        <div className="w-full flex justify-center items-center h-screen">
            <div className="max-w-[1000px] w-full max-lg:px-6 max-lg:w-full ">
                <h1 className="font-serif text-5xl mb-8 max-sm:text-4xl max-sm:text-center max-sm:mb-5">Create Post</h1>
                <PostCreateAndUpdateInputs
                    buttonText="Create"
                    onSubmit={createPost}
                    validationErrors={validationErrors}
                    clearError={clearError}
                />
            </div>
        </div>
    );
};

export default CreatePostPage;
