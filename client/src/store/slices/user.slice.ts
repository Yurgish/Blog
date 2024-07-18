import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse, IUser } from "../../models/userApi.models";
import { userApi } from "../../services/user.service";

export interface authorizedUser {
    user: IUser | undefined;
    isAuthorized: boolean;
}

const initialState: authorizedUser = {
    user: undefined,
    isAuthorized: false,
};

export const userSlice = createSlice({
    name: "authorizedUser",
    initialState,
    reducers: {
        // setCurrentUser: (state, action: PayloadAction<IUser>) => {
        //     state.user = action.payload;
        // },
        // deleteCurrentUser: () => {
        //     return initialState;
        // },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.loginUser.matchFulfilled,
            (state, action: PayloadAction<IAuthResponse>) => {
                state.user = action.payload.user;
                state.isAuthorized = true;
            }
        );
        builder.addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state) => {
            state.user = undefined;
            state.isAuthorized = false;
        });
    },
});

// export const { setCurrentUser, deleteCurrentUser } = userSlice.actions;

export default userSlice.reducer;
