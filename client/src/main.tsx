import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AppRouter } from "./routes.tsx";
import Notifications from "./components/notifications/Notifications.tsx";
import ProgressBar from "./components/ui/ProgressBar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppRouter />
            <Notifications />
            <ProgressBar />
        </Provider>
    </React.StrictMode>
);
