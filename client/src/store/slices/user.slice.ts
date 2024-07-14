import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/userApi.models";

const initialState: User = {
    login: "",
    email: "",
    roles: [],
    createdAt: "",
    _id: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            Object.assign(state, action.payload);
        },
        deleteCurrentUser: () => {
            return initialState;
        },
    },
});

export const { setCurrentUser, deleteCurrentUser } = userSlice.actions;

export default userSlice.reducer;
