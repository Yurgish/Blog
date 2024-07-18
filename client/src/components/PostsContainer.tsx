import Post from "./Post";

const PostsContainer = () => {
    return (
        <div className="w-full flex flex-col items-center gap-10 pt-16">
            <div className="text-white text-xl w-[900px]">
                <div className="flex flex-col items-center max-w-16 ">
                    <div className="bg-green w-5 h-1 mb-1"></div>
                    <p>Latest</p>
                </div>
            </div>
            <Post
                title="15 Disadvantages Of Freedom And How You Can Workaround It."
                summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                createdAt="2024-07-18T08:39:35.915Z"
                id="6698d4c7b3341f71e72fce6a"
                authorEmail="samurai2099@gmail.com"
                tags={["#meditation", "#programing"]}
            />
            <Post
                title="15 Disadvantages Of Freedom And How You Can Workaround It."
                summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                createdAt="2024-07-18T08:39:35.915Z"
                id="6698d4c7b3341f71e72fce6a"
                authorEmail="samurai2099@gmail.com"
                tags={["#meditation", "#programing"]}
            />
            <Post
                title="15 Disadvantages Of Freedom And How You Can Workaround It."
                summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                createdAt="2024-07-18T08:39:35.915Z"
                id="6698d4c7b3341f71e72fce6a"
                authorEmail="samurai2099@gmail.com"
                tags={["#meditation", "#programing"]}
            />
        </div>
    );
};

export default PostsContainer;
