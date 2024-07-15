import React, { useState } from "react";
import AuthLayout from "./layouts/AuthLayout";
import Input from "../components/Input";
import useValidationError from "../hooks/authValidationError";
import { userApi } from "../services/user.service";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import InputWithErrorMessages from "../components/InputWithErrorMessages";

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
    const navigate = useNavigate();
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
            navigate("/");
        } catch (error) {
            console.log(error);
            handleServerError(error);
            console.log(validationErrors);
        }
    };

    return (
        <AuthLayout authTitle="Sign Up" welcomeText="Let’s sign you up quickly">
            <form className="flex flex-col gap-5">
                <InputWithErrorMessages
                    type="text"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={handleFormChange}
                    name="email"
                    errorMessage={validationErrors.email}
                />
                <InputWithErrorMessages
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleFormChange}
                    name="password"
                    errorMessage={validationErrors.password}
                />
                <div className="mt-5 flex justify-between items-center">
                    <Button value="LOGIN" onClick={handleLoginSubmit} />
                    <div className="text-xl">
                        <p className="text-white ">don’t have an account?</p>
                        <Link to="/register" className="text-green hover:underline">
                            sign-up
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
