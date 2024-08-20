import AlertModal from "@/components/ui/AlertModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("AlertModal", () => {
    it("should render modal with correct content", () => {
        render(
            <AlertModal
                isVisible={true}
                onConfirm={() => {}}
                onClose={() => {}}
                alertText="Test Alert"
                confirmText="Confirm Test"
                denyText="Deny Test"
            >
                <div>Test Children</div>
            </AlertModal>
        );

        expect(screen.getByText("Test Alert")).toBeInTheDocument();
        expect(screen.getByText("Test Children")).toBeInTheDocument();
        expect(screen.getByText("Confirm Test")).toBeInTheDocument();
        expect(screen.getByText("Deny Test")).toBeInTheDocument();
    });

    it("should call onConfirm and onClose when confirm button is clicked", () => {
        const handleConfirm = vi.fn();
        const handleClose = vi.fn();

        render(<AlertModal isVisible={true} onConfirm={handleConfirm} onClose={handleClose} confirmText="Confirm" />);

        fireEvent.click(screen.getByText("Confirm"));
        expect(handleConfirm).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalled();
    });

    it("should call onDeny and onConfirm and after onClose when buttons is clicked", () => {
        const handleDeny = vi.fn();
        const handleClose = vi.fn();
        const handleConfirm = vi.fn();

        render(
            <AlertModal
                isVisible={true}
                onConfirm={handleConfirm}
                onDeny={handleDeny}
                onClose={handleClose}
                denyText="Deny"
                confirmText="Confirm"
            />
        );

        fireEvent.click(screen.getByText("Deny"));
        expect(handleDeny).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalled();

        fireEvent.click(screen.getByText("Confirm"));
        expect(handleConfirm).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalled();
    });

    it("should not render modal when isVisible is false", () => {
        render(<AlertModal isVisible={false} onConfirm={() => {}} onClose={() => {}} />);

        expect(screen.queryByText("Are you sure in your actions?")).not.toBeInTheDocument();
    });
});
