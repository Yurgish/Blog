import Tags from "@components/post/Tags";
import * as utils from "@utils/post.utils";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.spyOn(utils, "addHashtags");

describe("Tags component", () => {
    it("renders tags with hashtags and calls addHashtags", () => {
        // Масив тегів для тестування
        const tags = ["test1", "test2"];
        const hashtags = ["#test1", "#test2"];

        render(<Tags tags={tags} />);

        expect(utils.addHashtags).toHaveBeenCalledWith(tags);

        hashtags.forEach((hashtag) => {
            expect(screen.getByText(hashtag)).toBeInTheDocument();
        });
    });
});

// idk what is going on here
