import Button from "@/components/ui/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Button", () => {
    it("should render the button component", () => {
        render(<Button onClick={() => {}}>Click me</Button>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render the button as disabled when the disabled prop is true", () => {
        render(
            <Button onClick={() => {}} disabled={true}>
                Click me
            </Button>
        );
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should render children inside the button", () => {
        render(<Button onClick={() => {}}>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("should call the onClick function when the button is clicked", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalled();
    });

    it.each(["submit", "reset", "button"])("should have correct type attribute based on type prop %s", (typeProp) => {
        render(
            <Button type={typeProp as "submit" | "reset" | "button"} onClick={() => {}}>
                Button
            </Button>
        );
        expect(screen.getByRole("button")).toHaveAttribute("type", typeProp);
    });
});
