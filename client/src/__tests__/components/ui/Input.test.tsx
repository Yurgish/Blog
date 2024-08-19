import { fireEvent, render, screen } from "@testing-library/react";
import Input from "@/components/ui/Input";
import { test, expect, vi } from "vitest";

test.each([
    {
        type: "text",
        name: "username",
        placeholder: "Enter your username",
        value: "",
        expectedPlaceholder: "Enter your username",
    },
    {
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        value: "",
        expectedPlaceholder: "Enter your password",
        classname: "bg-red",
    },
    {
        type: "email",
        name: "email",
        placeholder: "Enter your email",
        value: "test@example.com",
        expectedPlaceholder: "Enter your email",
    },
])(
    "renders Input component with type $type and placeholder $expectedPlaceholder",
    ({ type, name, placeholder, value, expectedPlaceholder, classname }) => {
        const handleChange = vi.fn();

        render(
            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={classname}
            />
        );

        const inputElement = screen.getByPlaceholderText(expectedPlaceholder);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", type);
        expect(inputElement).toHaveValue(value);

        if (name) {
            expect(inputElement).toHaveAttribute("name", name);
        }

        if (classname) {
            expect(inputElement).toHaveClass(classname);
        }

        fireEvent.change(inputElement, { target: { value: "new value" } });

        expect(handleChange).toHaveBeenCalled();
    }
);
