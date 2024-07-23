import { postsApi } from "../services/posts.service";
import { htmlToPlainText } from "../utils/post.utils";
import Post from "./Post";

const PostsContainer = () => {
    const { data } = postsApi.useGetPostsQuery({});
    return (
        <div className="flex flex-col gap-10 max-lg:px-6">
            <div className="text-white text-xl w-[900px] max-lg:w-full max-sm:justify-center max-sm:flex">
                <div className="flex flex-col items-center max-w-16 max-lg:w-auto ">
                    <div className="bg-green w-5 h-1 mb-1"></div>
                    <p>Latest</p>
                </div>
            </div>
            {data &&
                data.posts.map((post) => (
                    <Post
                        key={post._id}
                        title={post.title}
                        summary={post.summary ? post.summary : htmlToPlainText(post.content)}
                        createdAt={post.createdAt}
                        id={post._id}
                        authorEmail={post.author.email}
                        tags={post.tags}
                    />
                ))}
        </div>
    );
};

export default PostsContainer;
