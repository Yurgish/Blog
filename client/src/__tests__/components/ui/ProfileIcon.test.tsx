import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import ProfileIcon from "@/components/ui/ProfileIcon";

test.each([
    { login: "username", expected: "u" },
    { login: "gumcka", expected: "g" },
    { login: "", expected: "?" },
])("renders ProfileIcon with login prop $login -> $expected", ({ login, expected }) => {
    const { getByText } = render(<ProfileIcon login={login} />);
    expect(getByText(expected)).toBeInTheDocument();
});
