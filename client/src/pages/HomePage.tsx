import { useDispatch } from "react-redux";
import PostsContainer from "../components/PostsContainer";
import { addNotification } from "../store/slices/notification.slice";
import PageMenuLayout from "./layouts/PageMenuLayout";

const getRandomNotificationType = (): "success" | "fail" => {
    const types: ("success" | "fail")[] = ["success", "fail"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
};

const HomePage = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            addNotification({
                type: getRandomNotificationType(),
                message: "Operation successful!",
            })
        );
    };
    return (
        <PageMenuLayout>
            <PostsContainer />
            <button onClick={handleClick}>Show Notification</button>
        </PageMenuLayout>
    );
};

export default HomePage;
