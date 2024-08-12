import React, { useRef } from "react";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    elementNumber?: number;
}

const Reveal: React.FC<Props> = ({ children, width = "fit-content", elementNumber = 1 }) => {
    const ref = useRef(null);
    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 40, rotateX: 30, translateX: "3%" },
                    visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        translateX: "0%",
                        transition: {
                            duration: 0.55,
                            delay: 0.3 + elementNumber * 0.2,
                            type: "spring",
                        },
                    },
                }}
                initial="hidden"
                animate="visible"
            >
                {children}
            </motion.div>
            <motion.div
                variants={{
                    initial: { translateX: "100%" },
                    shrink: { translateX: ["100%", 0, "-110%"] },
                }}
                initial="initial"
                animate="shrink"
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: elementNumber * 0.2,
                    times: [0, 0.4, 0.6, 1],
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    background: "#6EEB83",
                    zIndex: 20,
                }}
            />
        </div>
    );
};

export default Reveal;
