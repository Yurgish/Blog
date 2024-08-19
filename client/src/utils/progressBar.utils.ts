import { completeProgress, startProgress } from "@/store/slices/progressBar.slice";
import { store } from "@/store/store";

export const handleProgressBar = (action: "start" | "complete") => {
    if (action === "start") {
        store.dispatch(startProgress());
    } else if (action === "complete") {
        store.dispatch(completeProgress());
    }
};
