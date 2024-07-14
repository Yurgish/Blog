import { useState } from "react";

type ServerValidationError = {
    type: string;
    value: string;
    msg: string;
    path: keyof ValidationErrors;
    location: string;
};

type ValidationErrors = {
    login?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
};

const useValidationError = () => {
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const setErrors = (errors: ServerValidationError[]) => {
        const newErrors: ValidationErrors = {};
        errors.forEach((error) => {
            if (newErrors[error.path]) return;
            newErrors[error.path] = error.msg;
        });
        setValidationErrors(newErrors);
    };

    const clearError = (field: keyof ValidationErrors) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: undefined,
        }));
    };

    const clearErrors = () => {
        setValidationErrors({});
    };

    const handleServerError = (error: unknown) => {
        if (error && typeof error === "object" && "data" in error) {
            const serverError = error as { data: { errors: ServerValidationError[] } };
            if (serverError.data && serverError.data.errors) {
                setErrors(serverError.data.errors);
            }
        }
    };

    return {
        validationErrors,
        setErrors,
        clearErrors,
        clearError,
        handleServerError,
    };
};

export default useValidationError;
