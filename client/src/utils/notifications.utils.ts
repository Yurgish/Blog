import { NotificationType } from "../models/notification.models";
import { addNotification } from "../store/slices/notification.slice";
import { store } from "../store/store";
import { isServerError } from "./typesGuard";

export const notify = (message: string, type: NotificationType) => {
    store.dispatch(addNotification({ type, message }));
};

export const handleApiError = (error: unknown) => {
    if (isServerError(error)) {
        notify(error.data?.message || "An unexpected error occurred", "fail");
    } else {
        notify("An unexpected error occurred", "fail");
    }
};
