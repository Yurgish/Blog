import { beforeAll, describe, expect, test } from "vitest";
import { IModeratedPost, IPostResponse } from "../../models/postsApi.models";
import {
    transformEmail,
    htmlToPlainText,
    truncateText,
    cleanTags,
    addHashtags,
    splitTags,
    isAuthorOfPost,
    formatDate,
    transformModeratedPostToPostResponse,
} from "../../utils/post.utils";

// htmlToPlainText
describe("htmlToPlainText", () => {
    test("should convert HTML to plain text", () => {
        const html = "<div><p>Hello, <strong>world!</strong></p></div>";
        expect(htmlToPlainText(html)).toBe("Hello, world!");
    });

    test("should add a period between camelCase words", () => {
        const html = "<div>camelCaseText</div>";
        expect(htmlToPlainText(html)).toBe("camel. Case. Text.");
    });

    test("should add a period at the end if missing", () => {
        const html = "<div>This is a sentence without a period</div>";
        expect(htmlToPlainText(html)).toBe("This is a sentence without a period.");
    });

    test("should trim whitespace around text", () => {
        const html = "<div>   Text with whitespace   </div>";
        expect(htmlToPlainText(html)).toBe("Text with whitespace.");
    });
});

// truncateText

describe("truncateText", () => {
    test("should return the original text if it is shorter than maxLength", () => {
        expect(truncateText("The original panel.", 20)).toBe("The original panel.");
    });

    test("should return truncated text if it is longer than maxLength", () => {
        expect(truncateText("The original panel.", 10)).toBe("The origin");
    });

    test("should return the original text if maxLength is equal to text length", () => {
        expect(truncateText("Text & ten", 10)).toBe("Text & ten");
    });

    test("should return an empty string if the input text is empty", () => {
        expect(truncateText("", 10)).toBe("");
    });
});

// transformEmail
describe("transformEmail", () => {
    test("should transform email correctly", () => {
        expect(transformEmail("gumcka123@gmail.com")).toBe("@gumcka123");
    });

    test("should return empty string if email is empty", () => {
        expect(transformEmail("")).toBe("");
    });
});

//cleanTags
describe("cleanTags", () => {
    test("should remove non-alphanumeric characters and convert to lowercase", () => {
        const tags = ["Hello!@#", "World123$", "Test_123"];
        expect(cleanTags(tags)).toEqual(["hello", "world123", "test123"]);
    });

    test("should return an empty array if input is an empty array", () => {
        expect(cleanTags([])).toEqual([]);
    });

    test("should handle tags with spaces", () => {
        const tags = ["Hello World", "Test Tag"];
        expect(cleanTags(tags)).toEqual(["helloworld", "testtag"]);
    });

    test("should return the correct number of elements in the array", () => {
        const inputTags = ["1", "2", "3", "6", "7"];
        expect(cleanTags(inputTags)).toHaveLength(inputTags.length);
    });
});

//addHashtags
describe("addHashtags", () => {
    test("should add tags correctly", () => {
        expect(addHashtags(["tag", "life", "death"])).toEqual(["#tag", "#life", "#death"]);
    });

    test("should return empty array if tags array is empty", () => {
        expect(addHashtags([])).toEqual([]);
    });
});

//splitTags
describe("addHashtags", () => {
    test("should split a comma-separated string into an array of tags", () => {
        const tagsString = "tag1,tag2,tag3";
        expect(splitTags(tagsString)).toEqual(["tag1", "tag2", "tag3"]);
    });

    test("should trim whitespace around tags", () => {
        const tagsString = " tag1 , tag2 , tag3 ";
        expect(splitTags(tagsString)).toEqual(["tag1", "tag2", "tag3"]);
    });

    test("should handle a string with only one tag", () => {
        expect(splitTags("singleTag")).toEqual(["singleTag"]);
    });

    test("should return an empty array for an empty string", () => {
        expect(splitTags("")).toEqual([]);
    });

    test("should handle multiple consecutive commas", () => {
        const tagsString = "tag1,,,tag2,,tag3";
        const result = splitTags(tagsString);
        expect(result).toEqual(["tag1", "tag2", "tag3"]);
    });
});

//isAuthorOfPost
describe("isAuthorOfPost", () => {
    test("should return true if emails are the same", () => {
        expect(isAuthorOfPost("mail@gmail.com", "mail@gmail.com")).toBe(true);
    });
    test("should return false if emails are diferent", () => {
        expect(isAuthorOfPost("mail@gmail.com", "notAuthorMail@gmail.com")).toBe(false);
    });
});

//formatDate
describe("formatDate", () => {
    let dateString: string;

    beforeAll(() => {
        dateString = "2024-08-16T00:00:00Z";
    });

    test("should format date with day, month, and year by default", () => {
        expect(formatDate(dateString)).toBe("16 Aug 2024");
    });

    test("should format date with day, month, and year by defined options", () => {
        expect(formatDate(dateString, { day: true, month: true, year: true })).toBe("16 Aug 2024");
    });

    test("should format date with day, month, and year by defined options", () => {
        expect(formatDate(dateString, { day: true, month: true, year: true })).toBe("16 Aug 2024");
    });

    test("should format date with only month and year", () => {
        expect(formatDate(dateString, { day: false, month: true, year: true })).toBe("Aug 2024");
    });

    test("should format date with only year", () => {
        expect(formatDate(dateString, { day: false, month: false, year: true })).toBe("2024");
    });

    test("should throw an error for invalid date string", () => {
        expect(() => formatDate("invalid-date", { day: true, month: true, year: true })).toThrow("Invalid date");
    });
});

//transformModeratedPostToPostResponse
describe("transformModeratedPostToPostResponse", () => {
    let postResponse: IPostResponse;
    beforeAll(() => {
        postResponse = {
            _id: "1",
            title: "Post Title",
            summary: "Post Summary",
            content: "Post Content",
            tags: ["tag1", "tag2"],
            author: {
                _id: "author1",
                email: "author@example.com",
            },
            createdAt: "2024-08-16T00:00:00Z",
            updatedAt: "2024-08-16T00:00:00Z",
        };
    });

    test("should return IPostResponse if the input is already of type IPostResponse", () => {
        const result = transformModeratedPostToPostResponse(postResponse);
        expect(result).toBe(postResponse);
    });

    test("should transform IModeratedPost to IPostResponse", () => {
        const moderatedPost: IModeratedPost = {
            _id: "1",
            post: {
                title: "Post Title",
                summary: "Post Summary",
                content: "Post Content",
                tags: ["tag1", "tag2"],
                author: {
                    _id: "author1",
                    email: "author@example.com",
                },
            },
            checks: 3,
            isRefused: false,
            adminMessage: "Approved",
            createdAt: "2024-08-16T00:00:00Z",
            updatedAt: "2024-08-16T00:00:00Z",
            __v: 0,
        };

        const result = transformModeratedPostToPostResponse(moderatedPost);
        expect(result).toEqual(postResponse);
    });

    test("should handle input with missing properties", () => {
        const invalidPost = { _id: "1" } as IModeratedPost;
        expect(() => transformModeratedPostToPostResponse(invalidPost)).toThrow();
    });
});
