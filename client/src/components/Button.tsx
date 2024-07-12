import React from "react";

type ButtonProps = {
    type: "submit" | "reset" | "button";
    value: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({ type = "button", value, onClick, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-green text-black font-semibold text-xl py-4 px-12 ${className}`}
        >
            {value}
        </button>
    );
};

export default Button;
