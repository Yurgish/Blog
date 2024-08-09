import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../models/notification.models";

export interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationsSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
            const id = Date.now().toString();
            state.notifications.push({ id, ...action.payload });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
        },
    },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
