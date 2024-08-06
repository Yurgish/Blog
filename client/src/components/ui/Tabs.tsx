import { FC } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
    tabs: { name: string; path: string }[];
    selectedTabPath?: string;
}

const variants = {
    active: {
        color: "#1a2e05",
        transition: { type: "spring", damping: 10, delay: 0.2 },
    },
    unactive: {
        color: "#FFFFFF",
        transition: { type: "spring" },
    },
};

const Tabs: FC<Props> = ({ tabs, selectedTabPath }) => {
    return (
        <div className="border border-green font-light bg-background-black flex gap-1 p-1">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    to={tab.path}
                    className={`relative px-7 py-4 max-sm:px-6 max-sm:py-3 cursor-pointer hover:bg-[#333333] transition-colors`}
                >
                    {tab.path === selectedTabPath && (
                        <motion.span
                            layoutId="tabCursor"
                            transition={{ type: "spring", damping: 20 }}
                            className="bg-green absolute inset-0 z-0"
                        ></motion.span>
                    )}
                    <motion.span
                        initial={tab.path === selectedTabPath ? "active" : "unactive"}
                        variants={variants}
                        animate={tab.path === selectedTabPath ? "active" : "unactive"}
                        className="relative z-10 text-bold"
                    >
                        {tab.name}
                    </motion.span>
                </Link>
            ))}
        </div>
    );
};

export default Tabs;
