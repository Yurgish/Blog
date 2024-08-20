import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InputWithErrorMessages from "@/components/ui/InputWithErrorMessages";

describe("InputWithErrorMessages", () => {
    it("should render the input component", () => {
        render(
            <InputWithErrorMessages
                type="text"
                placeholder="Enter text"
                value=""
                onChange={() => {}}
                errorMessage={undefined}
            />
        );
        expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("should display an error message when provided", () => {
        render(
            <InputWithErrorMessages
                type="text"
                placeholder="Enter text"
                value=""
                onChange={() => {}}
                errorMessage="This is an error"
            />
        );
        expect(screen.getByText("This is an error")).toBeInTheDocument();
    });

    it("should not display an error message when not provided", () => {
        render(
            <InputWithErrorMessages
                type="text"
                placeholder="Enter text"
                value=""
                onChange={() => {}}
                errorMessage={undefined}
            />
        );
        expect(screen.queryByText("This is an error")).toBeNull();
    });

    it("should pass props to the Input component", () => {
        render(
            <InputWithErrorMessages
                type="text"
                placeholder="Enter text"
                value="Test value"
                onChange={() => {}}
                className="input-class"
                name="test-input"
                errorMessage={undefined}
            />
        );
        expect(screen.getByPlaceholderText("Enter text")).toHaveAttribute("type", "text");
        expect(screen.getByPlaceholderText("Enter text")).toHaveValue("Test value");
        expect(screen.getByPlaceholderText("Enter text")).toHaveClass("input-class");
        expect(screen.getByPlaceholderText("Enter text")).toHaveAttribute("name", "test-input");
    });
});
