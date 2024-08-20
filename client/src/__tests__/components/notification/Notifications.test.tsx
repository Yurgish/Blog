import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import Notifications from "@/components/notifications/Notifications";
import notificationsReducer from "@/store/slices/notification.slice";

describe("Notifications", () => {
    it("renders notifications with correct content and type", () => {
        const notifications = [
            { id: "1", type: "success" as const, message: "Notification 1" },
            { id: "2", type: "fail" as const, message: "Notification 2" },
        ];

        const initialState = {
            notificationsReducer: {
                notifications,
            },
        };

        const store = configureStore({
            reducer: {
                notificationsReducer,
            },
            preloadedState: initialState,
        });

        render(
            <Provider store={store}>
                <Notifications />
            </Provider>
        );

        notifications.forEach(({ message }) => {
            expect(screen.getByText(message)).toBeInTheDocument();
        });
    });
});

//remake later
