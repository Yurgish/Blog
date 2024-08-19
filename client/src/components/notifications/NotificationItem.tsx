import { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { Notification, NotificationType } from "@models/notification.models";
import { MdOutlineNotificationsActive } from "react-icons/md";
import BellAnimation from "@components/animation/BellAnimation";

// Add icon animation

const NOTIFICATION_TIMEOUT = 2500;

interface NotificationItemProps extends Notification {
    onRemove: (id: string) => void;
}

const typeClassNames: Record<NotificationType, string> = {
    success: "bg-green",
    fail: "bg-red",
};

const getNotificationItemClassNames = (type: NotificationType) => {
    return typeClassNames[type];
};

const NotificationItem: FC<NotificationItemProps> = ({ id, type, message, onRemove }) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onRemove(id);
        }, NOTIFICATION_TIMEOUT);

        return () => clearTimeout(timeoutId);
    }, [id, onRemove]);

    return (
        <motion.div
            layout
            key={id}
            initial={{ opacity: 0, x: "50%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "50%" }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={`px-[26px] py-[20px] w-96 flex justify-between items-center mb-3 ${getNotificationItemClassNames(
                type
            )}`}
        >
            <div className="text-base text-background-black">
                <p className="uppercase leading-5 mb-1">{type}</p>
                <p className="leading-5">{message}</p>
            </div>
            <BellAnimation>
                <MdOutlineNotificationsActive className="text-background-black text-4xl min-w-9" />
            </BellAnimation>
        </motion.div>
    );
};

export default NotificationItem;
