import Tabs from "@/components/ui/Tabs";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

describe("Tabs Component", () => {
    const tabs = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    it("renders all tabs and links correctly", () => {
        render(
            <MemoryRouter>
                <Tabs tabs={tabs} />
            </MemoryRouter>
        );

        tabs.forEach((tab) => {
            expect(screen.getByText(tab.name)).toBeInTheDocument();
        });

        tabs.forEach((tab) => {
            const link = screen.getByText(tab.name);
            expect(link.closest("a")).toHaveAttribute("href", tab.path);
        });
    });
});
