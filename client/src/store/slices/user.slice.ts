import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse, IUser } from "../../models/userApi.models";
import { userApi } from "../../services/user.service";
import { isAdmin } from "../../utils/user.utils";

export interface authorizedUser {
    user: IUser | undefined;
    isAuthorized: boolean;
    isAdmin: boolean;
}

const initialState: authorizedUser = {
    user: undefined,
    isAuthorized: false,
    isAdmin: false,
};

export const userSlice = createSlice({
    name: "authorizedUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.loginUser.matchFulfilled,
            (state, action: PayloadAction<IAuthResponse>) => {
                state.user = action.payload.user;
                state.isAuthorized = true;
                state.isAdmin = isAdmin(action.payload.user.roles);
            }
        );
        builder.addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state) => {
            state.user = undefined;
            state.isAuthorized = false;
            state.isAuthorized = false;
        });
        builder.addMatcher(
            userApi.endpoints.checkAuth.matchFulfilled,
            (state, action: PayloadAction<IAuthResponse>) => {
                state.user = action.payload.user;
                state.isAuthorized = true;
                state.isAdmin = isAdmin(action.payload.user.roles);
            }
        );
        builder.addMatcher(userApi.endpoints.checkAuth.matchRejected, (state) => {
            state.user = undefined;
            state.isAuthorized = false;
            state.isAuthorized = false;
        });
    },
});

// export const { setCurrentUser, deleteCurrentUser } = userSlice.actions;

export default userSlice.reducer;
