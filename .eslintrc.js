module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        indent: [1, 4],
        "linebreak-style": [1, "unix"],
        quotes: [1, "double"],
        semi: [1, "never"],
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        process: true,
    },
}
