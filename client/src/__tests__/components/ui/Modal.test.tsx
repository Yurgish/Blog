import Modal from "@/components/ui/Modal";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Modal", () => {
    it("should render children inside the modal", () => {
        render(
            <Modal isVisible={true} onClose={() => {}}>
                <div>Test Content</div>
            </Modal>
        );
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should not render modal when isVisible is false", () => {
        render(
            <Modal isVisible={false} onClose={() => {}}>
                <div>Content</div>
            </Modal>
        );
        expect(screen.queryByText("Content")).toBeNull();
    });

    it("should call onClose when clicking outside the modal", () => {
        const handleClose = vi.fn();
        render(
            <Modal isVisible={true} onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        fireEvent.click(screen.getByTestId("modal-overlay"));

        expect(handleClose).toHaveBeenCalled();
    });

    it("should not call onClose when clicking inside the modal", () => {
        const handleClose = vi.fn();
        render(
            <Modal isVisible={true} onClose={handleClose}>
                <div>
                    <p>Modal Content</p>
                </div>
            </Modal>
        );

        // Click inside the modal
        fireEvent.click(screen.getByTestId("modal-body"));

        expect(handleClose).not.toHaveBeenCalled();
    });

    it("should apply styles based on class names", () => {
        const modalClassName = "custom-modal-class";
        const overlayClassName = "custom-overlay-class";
        render(
            <Modal
                isVisible={true}
                onClose={() => {}}
                modalClassName={modalClassName}
                overlayClassName={overlayClassName}
            >
                <div>Styled Modal Content</div>
            </Modal>
        );
        expect(screen.getByTestId("modal-overlay").classList.contains(overlayClassName)).toBe(true);
        expect(screen.getByTestId("modal-body").classList.contains(modalClassName)).toBe(true);
    });
});
