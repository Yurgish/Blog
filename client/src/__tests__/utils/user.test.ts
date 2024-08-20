import { isAdmin } from "@utils/user.utils";
import { describe, test, expect } from "vitest";

describe("isAdmin", () => {
    test.each([
        { roleArray: [], expected: false },
        { roleArray: ["USER"], expected: false },
        { roleArray: ["USER", "ADMIN"], expected: true },
    ])("should return $expected if array is $roleArray", ({ roleArray, expected }) => {
        expect(isAdmin(roleArray)).toBe(expected);
    });
});
