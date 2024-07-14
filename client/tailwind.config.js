/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                white: "#FFFFFF",
                green: "#6EEB83",
                grey: "#A5A5A5",
                "background-black": "#272727",
                red: "#FF5E5B",
                black: "#1A2E05",
            },
            fontFamily: {
                sans: ["Lexend Deca", "sans-serif"],
                serif: ["DM Serif Display", "serif"],
            },
        },
    },
    plugins: [],
};
