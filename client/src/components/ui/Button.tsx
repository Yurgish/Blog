import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
    type?: "submit" | "reset" | "button";
    value: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type = "button", value, onClick, className, disabled }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type={type}
            onClick={onClick}
            className={`bg-green text-black font-semibold text-xl py-4 px-12 disabled:bg-grey disabled:text-black max-sm:px-9 max-sm:py-3 ${className}`}
            disabled={disabled}
        >
            {value}
        </motion.button>
    );
};

export default Button;
