import { FC } from "react";
import Input, { InputProps } from "./Input";

interface InputWithErrorMessagesProps extends InputProps {
    errorMessage: string | undefined;
}

const InputWithErrorMessages: FC<InputWithErrorMessagesProps> = ({
    type,
    placeholder,
    value,
    onChange,
    className,
    name,
    errorMessage,
}) => {
    return (
        <div>
            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
            />
            {errorMessage && <p className="text-red italic text-sm mt-1">{errorMessage}</p>}
        </div>
    );
};

export default InputWithErrorMessages;
