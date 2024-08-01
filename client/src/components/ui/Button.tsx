import React from "react";
import { motion } from "framer-motion";

type Size = "small" | "large";
type Variant = "default" | "deny";

const sizeClasses: Record<Size, string> = {
    small: "px-5 py-2 text-base",
    large: "py-4 px-12 max-sm:px-9 max-sm:py-3 text-xl",
};

const variantClasses: Record<Variant, string> = {
    default: "bg-green text-black",
    deny: "bg-red text-white",
};

const getButtonClassNames = (size: Size, variant: Variant, disabled: boolean) => {
    const sizeClass = sizeClasses[size] || sizeClasses.large;

    const variantClass = variantClasses[variant] || variantClasses.default;

    const disabledClass = disabled ? "disabled:bg-grey disabled:text-black" : "";

    return `${sizeClass} ${variantClass} ${disabledClass}`;
};

type ButtonProps = {
    type?: "submit" | "reset" | "button";
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    size?: Size;
    variant?: Variant;
};

const Button: React.FC<ButtonProps> = ({
    type = "button",
    children,
    onClick,
    disabled = false,
    size = "large",
    variant = "default",
}) => {
    const buttonClassName = getButtonClassNames(size, variant, disabled);

    return (
        <motion.button
            whileTap={disabled ? {} : { scale: 0.95 }}
            whileHover={disabled ? {} : { scale: 1.05 }}
            type={type}
            onClick={disabled ? undefined : onClick}
            className={`${buttonClassName} font-semibold`}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
};

export default Button;
