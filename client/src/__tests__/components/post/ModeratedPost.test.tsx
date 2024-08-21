import ModeratedPost from "@/components/post/ModeratedPost";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { describe, it, expect, vi } from "vitest";

// Mocking the components used within ModeratedPost
vi.mock("@/components/post/Tags", () => ({
    default: vi.fn(() => <div>Mocked Tags</div>),
}));

vi.mock("@/components/post/ModeratedPostAdminControls", () => ({
    default: vi.fn(() => <div>Mocked ModeratedPostAdminControls</div>),
}));

vi.mock("@/utils/post.utils", () => ({
    formatDate: vi.fn(() => "Formatted Date"),
}));

describe("ModeratedPost", () => {
    const baseProps = {
        title: "Sample Title",
        id: "1",
        authorEmail: "author@example.com",
        createdAt: "2023-08-20T12:34:56Z",
        checks: 3,
    };

    it("should render the post details correctly", () => {
        render(
            <MemoryRouter>
                <ModeratedPost {...baseProps} />
            </MemoryRouter>
        );

        expect(screen.getByText("Sample Title")).toBeInTheDocument();
        expect(screen.getByText("| Formatted Date |")).toBeInTheDocument();
        expect(screen.getByText("Author: author@example.com |")).toBeInTheDocument();
        expect(screen.getByText("Checks: 3 |")).toBeInTheDocument();
        expect(screen.getByText("Link to post")).toBeInTheDocument();
    });

    it("should render the Tags component if tags are provided", () => {
        render(
            <MemoryRouter>
                <ModeratedPost {...baseProps} tags={["tag1", "tag2"]} />
            </MemoryRouter>
        );

        expect(screen.getByText("Mocked Tags")).toBeInTheDocument();
    });

    it("should not render the Tags component if no tags are provided", () => {
        render(
            <MemoryRouter>
                <ModeratedPost {...baseProps} />
            </MemoryRouter>
        );

        expect(screen.queryByText("Mocked Tags")).not.toBeInTheDocument();
    });

    it("should render the correction message if provided", () => {
        render(
            <MemoryRouter>
                <ModeratedPost {...baseProps} message="Please correct this post" />
            </MemoryRouter>
        );

        expect(screen.getByText("Last message for correction: Please correct this post")).toBeInTheDocument();
    });

    it("should render the ModeratedPostAdminControls component", () => {
        render(
            <MemoryRouter>
                <ModeratedPost {...baseProps} />
            </MemoryRouter>
        );

        expect(screen.getByText("Mocked ModeratedPostAdminControls")).toBeInTheDocument();
    });

    it("should create a correct link to the post", () => {
        render(
            <MemoryRouter>
                <ModeratedPost {...baseProps} />
            </MemoryRouter>
        );

        const linkElement = screen.getByText("Link to post");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/post/moderated/1");
    });
});
