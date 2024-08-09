import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hooks";
import { removeNotification } from "../../store/slices/notification.slice";
import NotificationItem from "./NotificationItem";
import { AnimatePresence } from "framer-motion";

const Notifications = () => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state.notificationsReducer.notifications);

    const handleRemove = (id: string) => {
        dispatch(removeNotification(id));
    };

    return createPortal(
        <div className="fixed top-0 right-0 p-4">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        type={notification.type}
                        message={notification.message}
                        onRemove={handleRemove}
                    />
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};

export default Notifications;
