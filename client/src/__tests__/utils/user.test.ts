import { isAdmin } from "../../utils/user.utils";
import { describe, test, expect } from "vitest";
// isAdmin
describe("transformEmail", () => {
    test("should return false if array is empty", () => {
        expect(isAdmin([])).toBe(false);
    });

    test("should return false if there are no ADMIN in the array", () => {
        expect(isAdmin(["USER"])).toBe(false);
    });

    test("should return true if there are ADMIN in the array", () => {
        expect(isAdmin(["USER", "ADMIN"])).toBe(true);
    });
});
