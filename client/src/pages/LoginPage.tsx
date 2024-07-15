import React, { useState } from "react";
import AuthLayout from "./layouts/AuthLayout";
import Input from "../components/Input";
import useValidationError from "../hooks/authValidationError";
import { userApi } from "../services/user.service";
import Button from "../components/Button";

type UserLoginForm = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [loginForm, setLoginForm] = useState<UserLoginForm>({
        email: "",
        password: "",
    });

    const { validationErrors, clearErrors, handleServerError, clearError } = useValidationError();
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        clearError(name as keyof UserLoginForm);
    };

    const [loginTrigger, { isLoading }] = userApi.useLoginUserMutation();

    const handleLoginSubmit = async () => {
        clearErrors();
        try {
            await loginTrigger(loginForm).unwrap();
        } catch (error) {
            console.log(error);
            handleServerError(error);
            console.log(validationErrors);
        }
    };

    return (
        <AuthLayout authTitle="Sign Up" welcomeText="Let’s sign you up quickly">
            <form className="flex flex-col gap-5">
                <div>
                    <Input
                        type="text"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={handleFormChange}
                        name="email"
                        className="mb-1"
                    />
                    {validationErrors.email && <p className="text-red italic text-sm">{validationErrors.email}</p>}
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={handleFormChange}
                        name="password"
                        className="mb-1"
                    />
                    {validationErrors.email && <p className="text-red italic text-sm">{validationErrors.email}</p>}
                </div>
                <div className="mt-5">
                    <Button value="SUBMIT" onClick={handleLoginSubmit} />
                </div>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
