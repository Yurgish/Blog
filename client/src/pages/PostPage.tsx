import { useNavigate, useParams } from "react-router-dom";
import { postsApi } from "../services/posts.service";
import PageWrapperLayout from "./layouts/PageWrapperLayout";
import { useEffect } from "react";
import PostPageLayout from "./layouts/PostPageLayout";

const PostPage = () => {
    const { id } = useParams();
    const { data: post, isLoading, error } = postsApi.useGetPostByIdQuery(id!);
    const navigate = useNavigate();

    useEffect(() => {
        if (!post && !isLoading && error) {
            console.log(error);
            navigate("/", { replace: true });
        }
    }, [post, isLoading, error]);

    return <PageWrapperLayout>{!isLoading && post && <PostPageLayout post={post} />}</PageWrapperLayout>;
};

export default PostPage;
