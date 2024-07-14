import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/user.service";
import userSlice from "./slices/user.slice";

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    currentUserReducer: userSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
