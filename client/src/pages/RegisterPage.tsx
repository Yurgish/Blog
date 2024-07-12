import React, { useState } from "react";
import AuthLayout from "./layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

type UserLoginForm = {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState<UserLoginForm>({
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(registerForm);
    };

    const handleRegisterSubmit = () => {};

    return (
        <AuthLayout authTitle="Sign Up" welcomeText="Let’s sign you up quicklys">
            <form className="flex flex-col gap-5">
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={registerForm.login}
                    onChange={handleRegisterChange}
                    name="login"
                />
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    name="email"
                />
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    name="password"
                />
                <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    name="confirmPassword"
                />
                <div className="mt-5">
                    <Button type="submit" value="SUBMIT" onClick={handleRegisterSubmit} />
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
