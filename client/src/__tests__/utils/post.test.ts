import { IModeratedPost, IPostResponse } from "@/models/postsApi.models";
import {
    addHashtags,
    cleanTags,
    formatDate,
    htmlToPlainText,
    isAuthorOfPost,
    splitTags,
    transformEmail,
    transformModeratedPostToPostResponse,
    truncateText,
} from "@/utils/post.utils";
import { beforeAll, describe, expect, test } from "vitest";

describe("htmlToPlainText", () => {
    test.each([
        {
            html: "<div><p>Hello, <strong>world!</strong></p></div>",
            expected: "Hello, world!",
        },
        {
            html: "<div>camelCaseText</div>",
            expected: "camel. Case. Text.",
        },
        {
            html: "<div>This is a sentence without a period</div>",
            expected: "This is a sentence without a period.",
        },
        {
            html: "<div>   Text with whitespace   </div>",
            expected: "Text with whitespace.",
        },
    ])("should convert HTML to plain text correctly $html -> $expected", ({ html, expected }) => {
        expect(htmlToPlainText(html)).toBe(expected);
    });
});

describe("truncateText", () => {
    test.each([
        {
            text: "The original panel.",
            maxLength: 20,
            expected: "The original panel.",
        },
        {
            text: "The original panel.",
            maxLength: 10,
            expected: "The origin",
        },
        {
            text: "Text & ten",
            maxLength: 10,
            expected: "Text & ten",
        },
        {
            text: "",
            maxLength: 10,
            expected: "",
        },
    ])("should return truncated text correctly ($text, $maxLength) -> $expected", ({ text, maxLength, expected }) => {
        expect(truncateText(text, maxLength)).toBe(expected);
    });
});

describe("transformEmail", () => {
    test.each([
        { mail: "symbolic@verizon.net", expected: "@symbolic" },
        { mail: "stakasa@aol.com", expected: "@stakasa" },
        { mail: "muadip@me.com", expected: "@muadip" },
        { mail: "zeitlin-clows@gmail.com", expected: "@zeitlin-clows" },
        { mail: "rande@hotmail.com", expected: "@rande" },
        { mail: "trygstad@optonline.net", expected: "@trygstad" },
        { mail: "josem@yahoo.ca", expected: "@josem" },
        { mail: "world.day@mac.com", expected: "@world.day" },
        { mail: "isorashi@hotmail.com", expected: "@isorashi" },
        { mail: "arachne@live.com", expected: "@arachne" },
        { mail: "preneel@yahoo.com", expected: "@preneel" },
        { mail: "druschel@hotmail.com", expected: "@druschel" },
        { mail: "", expected: "" },
    ])("should transform email correctly $mail -> $expected", ({ mail, expected }) => {
        expect(transformEmail(mail)).toBe(expected);
    });
});

describe("cleanTags", () => {
    test.each([
        {
            inputTags: ["Hello!@#", "World123$", "Test_123"],
            expected: ["hello", "world123", "test123"],
        },
        {
            inputTags: [],
            expected: [],
        },
        {
            inputTags: ["Hello World", "Test Tag"],
            expected: ["helloworld", "testtag"],
        },
    ])("should clean tags correctly $inputTags -> $expected", ({ inputTags, expected }) => {
        expect(cleanTags(inputTags)).toEqual(expected);
    });

    test("should return the correct number of elements in the array", () => {
        const inputTags = ["1", "2", "3", "6", "7"];
        expect(cleanTags(inputTags)).toHaveLength(inputTags.length);
    });
});

describe("addHashtags", () => {
    test.each([
        { inputTags: ["tag", "life", "death"], expected: ["#tag", "#life", "#death"] },
        { inputTags: [], expected: [] },
    ])("should add hashtags correctly $inputTags -> $expected", ({ inputTags, expected }) => {
        expect(addHashtags(inputTags)).toEqual(expected);
    });
});

describe("splitTags", () => {
    test.each([
        { tagsString: "tag1,tag2,tag3", expected: ["tag1", "tag2", "tag3"] },
        { tagsString: " tag1 , tag2 , tag3 ", expected: ["tag1", "tag2", "tag3"] },
        { tagsString: "singleTag", expected: ["singleTag"] },
        { tagsString: "", expected: [] },
        { tagsString: "tag1,,,tag2,,tag3", expected: ["tag1", "tag2", "tag3"] },
    ])("should correctly split $tagsString -> $expected", ({ tagsString, expected }) => {
        expect(splitTags(tagsString)).toEqual(expected);
    });
});

describe("isAuthorOfPost", () => {
    test.each([
        { authorEmail: "mail@gmail.com", postEmail: "mail@gmail.com", expected: true },
        { authorEmail: "mail@gmail.com", postEmail: "notAuthorMail@gmail.com", expected: false },
    ])(
        "should return $expected when authorEmail is $authorEmail and postEmail is $postEmail",
        ({ authorEmail, postEmail, expected }) => {
            expect(isAuthorOfPost(authorEmail, postEmail)).toBe(expected);
        }
    );
});

describe("formatDate", () => {
    const dateString = "2024-08-16T00:00:00Z";

    test.each([
        { options: undefined, expected: "16 Aug 2024" },
        { options: { day: true, month: true, year: true }, expected: "16 Aug 2024" },
        { options: { day: false, month: true, year: true }, expected: "Aug 2024" },
        { options: { day: false, month: false, year: true }, expected: "2024" },
    ])("should format date with options $options -> $expected", ({ options, expected }) => {
        expect(formatDate(dateString, options)).toBe(expected);
    });

    test("should throw an error for invalid date string", () => {
        expect(() => formatDate("invalid-date", { day: true, month: true, year: true })).toThrow("Invalid date");
    });
});

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
