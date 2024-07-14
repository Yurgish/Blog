import React from "react";

type ButtonProps = {
    type?: "submit" | "reset" | "button";
    value: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type = "button", value, onClick, className, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-green text-black font-semibold text-xl py-4 px-12 disabled:bg-grey disabled:text-black ${className}`}
            disabled={disabled}
        >
            {value}
        </button>
    );
};

export default Button;
