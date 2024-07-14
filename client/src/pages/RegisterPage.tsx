import React, { useEffect, useState } from "react";
import AuthLayout from "./layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { userApi } from "../services/user.service";
import { IUserRegister } from "../models/userApi.models";
import useValidationError from "../hooks/authValidationError";

type UserRegisterForm = {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState<UserRegisterForm>({
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const { validationErrors, clearErrors, handleServerError, clearError } = useValidationError();

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        clearError(name as keyof UserRegisterForm);
    };

    const [registerTrigger, { isLoading }] = userApi.useRegisterUserMutation();

    const handleRegisterSubmit = async () => {
        const { login, email, password } = registerForm;
        const userRegisterData: IUserRegister = { login, email, password };
        clearErrors();
        try {
            await registerTrigger(userRegisterData).unwrap();
        } catch (error) {
            console.log(error);
            handleServerError(error);
        }
    };

    useEffect(() => {
        setIsButtonDisabled(() => {
            return (
                registerForm.confirmPassword !== registerForm.password ||
                registerForm.confirmPassword === "" ||
                registerForm.password === ""
            );
        });
    }, [registerForm, setRegisterForm]);

    return (
        <AuthLayout authTitle="Sign Up" welcomeText="Let’s sign you up quickly">
            <form className="flex flex-col gap-5">
                <div>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={registerForm.login}
                        onChange={handleRegisterChange}
                        name="login"
                        className="mb-1"
                    />
                    {validationErrors.login && <p className="text-red italic text-sm">{validationErrors.login}</p>}
                </div>
                <div>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        name="email"
                        className="mb-1"
                    />
                    {validationErrors.email && <p className="text-red italic text-sm">{validationErrors.email}</p>}
                </div>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    name="password"
                    className="mb-1"
                />
                <div>
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        name="confirmPassword"
                        className="mb-1"
                    />
                    {validationErrors.password && (
                        <p className="text-red italic text-sm">{validationErrors.password}</p>
                    )}
                </div>
                <div className="mt-5">
                    <Button value="SUBMIT" onClick={handleRegisterSubmit} disabled={isButtonDisabled} />
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
