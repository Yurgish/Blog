import { useNavigate } from "react-router-dom";
import PostCreateAndUpdateInputs from "../components/PostCreateAndUpdateInputs";
import useValidationError from "../hooks/authValidationError";
import { IPost } from "../models/postsApi.models";
import { postsApi } from "../services/posts.service";
import PageWrapperLayout from "./layouts/PageWrapperLayout";

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
        <PageWrapperLayout>
            <h1 className="font-serif text-5xl mb-8 max-sm:text-4xl max-sm:text-center max-sm:mb-5">Create Post</h1>
            <PostCreateAndUpdateInputs
                buttonText="Create"
                onSubmit={createPost}
                validationErrors={validationErrors}
                clearError={clearError}
            />
        </PageWrapperLayout>
    );
};

export default CreatePostPage;
