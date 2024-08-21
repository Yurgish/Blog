import Post from "@/components/post/Post";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

describe("Post Component", () => {
    const defaultProps = {
        title: "Sample Post",
        summary: "This is a sample summary that will be truncated.",
        id: "123",
        authorEmail: "author@example.com",
        tags: ["react", "testing"],
        createdAt: "2024-08-01T00:00:00Z",
    };

    it("should render post title and summary", () => {
        render(
            <MemoryRouter>
                <Post {...defaultProps} />
            </MemoryRouter>
        );

        expect(screen.getByText("Sample Post")).toBeInTheDocument();
        expect(screen.getByText("This is a sample summary that will be truncated.")).toBeInTheDocument();
        expect(screen.getByText("...read more")).toBeInTheDocument();
    });

    it("should format the email correctly", () => {
        render(
            <MemoryRouter>
                <Post {...defaultProps} />
            </MemoryRouter>
        );

        expect(screen.getByText("@author")).toBeInTheDocument();
    });

    it("should render tags if provided", () => {
        render(
            <MemoryRouter>
                <Post {...defaultProps} />
            </MemoryRouter>
        );

        expect(screen.getByText("#react")).toBeInTheDocument();
        expect(screen.getByText("#testing")).toBeInTheDocument();
    });

    it("should not render tags if not provided", () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { tags, ...propsWithoutTags } = defaultProps;

        render(
            <MemoryRouter>
                <Post {...propsWithoutTags} />
            </MemoryRouter>
        );

        expect(screen.queryByText("#react")).not.toBeInTheDocument();
        expect(screen.queryByText("#testing")).not.toBeInTheDocument();
    });

    it('should navigate to post detail page on "read more" link click', () => {
        render(
            <MemoryRouter>
                <Post {...defaultProps} />
            </MemoryRouter>
        );

        expect(screen.getByText("...read more").closest("a")).toHaveAttribute("href", "/post/123");
    });
});
