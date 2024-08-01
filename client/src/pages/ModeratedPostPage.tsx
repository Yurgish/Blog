import { useNavigate, useParams } from "react-router-dom";
import { postsApi } from "../services/posts.service";
import PageWrapperLayout from "./layouts/PageWrapperLayout";
import { useEffect } from "react";
import PostPageLayout from "./layouts/PostPageLayout";

const ModeratedPostPage = () => {
    const { id } = useParams();
    const { data: post, isLoading, error } = postsApi.useGetModeratedPostByIdQuery(id!);
    const navigate = useNavigate();

    useEffect(() => {
        if (!post && !isLoading && error) {
            console.log(error);
            navigate("/", { replace: true });
        }
    }, [post, isLoading, error]);

    return <PageWrapperLayout>{!isLoading && post && <PostPageLayout post={post} />}</PageWrapperLayout>;
};

export default ModeratedPostPage;
