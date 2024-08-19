module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    settings: {
        react: {
            version: "detect", // Automatically detect the React version
        },
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020, // Allows modern ECMAScript features
        sourceType: "module", // Allows import/export statements
        ecmaFeatures: {
            jsx: true, // Enables JSX parsing
        },
    },
};
