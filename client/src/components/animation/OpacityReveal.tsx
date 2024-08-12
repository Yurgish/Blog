import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface OpacityRevealProps {
    children: ReactNode;
}

const OpacityReveal: FC<OpacityRevealProps> = ({ children }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            {children}
        </motion.div>
    );
};

export default OpacityReveal;
