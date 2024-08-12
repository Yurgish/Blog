import { useAppSelector } from "../../hooks/store.hooks";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ProgressBar = () => {
    const { isFetching, progress } = useAppSelector((state) => state.progressBarReducer);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (isFetching) {
            setShouldAnimate(true);
        } else if (progress === 100) {
            setShouldAnimate(false);
        }
    }, [isFetching, progress]);

    return createPortal(
        <AnimatePresence>
            {shouldAnimate && (
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isFetching ? "70%" : "100%" }}
                    exit={{ width: "100%", transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="bg-green fixed top-0 left-0 h-[2px] z-[100]"
                />
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProgressBar;
