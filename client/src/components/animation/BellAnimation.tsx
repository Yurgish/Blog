import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface BellProps {
    children: ReactNode;
}

const BellAnimation: FC<BellProps> = ({ children }) => {
    return (
        <motion.div
            style={{ transformOrigin: "center top" }}
            initial={{ transform: "rotate(0)" }}
            animate={{
                transform: [
                    "rotate(0deg)",
                    "rotate(5deg)",
                    "rotate(-5deg)",
                    "rotate(5deg)",
                    "rotate(-5deg)",
                    "rotate(0deg)",
                ],
            }}
            transition={{
                duration: 0.5,
                delay: 0.15,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
};

export default BellAnimation;
