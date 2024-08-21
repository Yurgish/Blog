import ModeratedPostAdminControls from "@/components/post/ModeratedPostAdminControls";
import { useAppSelector } from "@/hooks/store.hooks";
import useIsSpecificRoute from "@/hooks/useIsSpecificRoute";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@hooks/store.hooks", () => ({
    useAppSelector: vi.fn(),
}));
vi.mock("@hooks/useIsSpecificRoute", () => ({
    default: vi.fn(),
}));
vi.mock("@/services/posts.service", () => ({
    postsApi: {
        useConfirmPostMutation: () => [vi.fn()],
        useRefusePostMutation: () => [vi.fn()],
    },
}));

describe("ModeratedPostAdminControls", () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue({ isAdmin: true });
        vi.mocked(useIsSpecificRoute).mockReturnValue(true);
    });

    it("should render buttons and handle clicks", () => {
        render(<ModeratedPostAdminControls postId="123" />);

        expect(screen.getByTestId("controls"));
        expect(screen.getByText("Confirm")).toBeInTheDocument();
        expect(screen.getByText("Refuse")).toBeInTheDocument();
    });

    it.each(["Confirm", "Refuse"])("should show modals on %s button clicks", (buttonPlaceholder) => {
        render(<ModeratedPostAdminControls postId="123" />);

        fireEvent.click(screen.getByText(buttonPlaceholder));
        expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
    });

    // redo, maybe

    // it("should trigger confirmPostTrigger", () => {
    //     const mockConfirmPostTrigger = vi.fn();
    //     vi.mocked(postsApi.useConfirmPostMutation).mockReturnValue([mockConfirmPostTrigger, { reset: () => {} }]);
    //     render(<ModeratedPostAdminControls postId="123" />);

    //     fireEvent.click(screen.getByText("Confirm"));
    //     const modal = screen.getByTestId("modal-overlay");
    //     expect(modal).toBeInTheDocument();

    //     const modalConfirmButton = within(modal).getByText("Confirm");

    //     fireEvent.click(modalConfirmButton);
    //     expect(mockConfirmPostTrigger).toHaveBeenCalledWith("123");
    // });
});
