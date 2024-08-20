import NotificationItem from "@/components/notifications/NotificationItem";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("NotificationItem", () => {
    it("should render NotificationItem with correct content", () => {
        render(<NotificationItem id="1" type="success" onRemove={() => {}} message="Some notification message" />);

        expect(screen.getByText("Some notification message")).toBeInTheDocument();
        expect(screen.getByText(/success/i)).toBeInTheDocument();
    });

    it("should call onRemove after timeout", () => {
        const onRemoveMock = vi.fn();
        vi.useFakeTimers(); // Використовуємо fake таймери

        render(<NotificationItem id="1" type="success" onRemove={onRemoveMock} message="Some notification message" />);

        expect(onRemoveMock).not.toHaveBeenCalled();

        vi.runOnlyPendingTimers();

        expect(onRemoveMock).toHaveBeenCalledWith("1");

        vi.useRealTimers();
    });
});
