import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProgressState {
    isFetching: boolean;
    progress: number;
}

const initialState: ProgressState = {
    isFetching: false,
    progress: 0,
};

const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        startProgress(state) {
            state.isFetching = true;
            state.progress = 0;
        },
        completeProgress(state) {
            state.isFetching = false;
            state.progress = 100;
        },
        setProgress(state, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
    },
});

export const { setProgress, startProgress, completeProgress } = progressSlice.actions;
export default progressSlice.reducer;
