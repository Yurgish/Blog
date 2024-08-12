import { completeProgress, startProgress } from "../store/slices/progressBar.slice";
import { store } from "../store/store";

export const handleProgressBar = (action: "start" | "complete") => {
    if (action === "start") {
        console.log("start");
        store.dispatch(startProgress());
    } else if (action === "complete") {
        console.log("complete");
        store.dispatch(completeProgress());
    }
};
