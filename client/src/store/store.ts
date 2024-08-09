import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/user.service";
import userSlice from "./slices/user.slice";
import { postsApi } from "../services/posts.service";
import notificationsSlice from "./slices/notification.slice";

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    userReducer: userSlice,
    notificationsReducer: notificationsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
