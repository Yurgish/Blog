import React, { FC } from "react";

export interface InputProps {
    type: string;
    name?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: FC<InputProps> = ({ type, placeholder, value, onChange, className, name }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full border border-green text-white font-light placeholder:text-grey px-7 py-5 bg-background-black max-sm:px-6 max-sm:py-4 ${className}`}
        />
    );
};

export default Input;
