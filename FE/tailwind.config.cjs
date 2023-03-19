/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        screens: {
            mobile: "30rem",
            tablet: "50rem",
            laptop: "64rem",
            desktop: "95rem",
            l_desktop: "102rem",
        },
        colors: {
            primary: {
                main: "#2563eb",
                hover: "#93c5fd",
            },
            error: {
                main: "#dc2626",
                hover: "#ef4444",
            },

            ...colors,
        },
    },
    plugins: [
        plugin(function ({ addUtilities, addComponents, theme }) {
            addComponents({
                ".huhu": {
                    padding: theme("spacing.6"),
                },
            });
            addUtilities({
                ".content-auto": {
                    "content-visibility": "auto",
                },
                ".content-hidden": {
                    "content-visibility": "hidden",
                },
                ".content-visible": {
                    "content-visibility": "visible",
                },
            });
        }),
        require("@tailwindcss/line-clamp"),
    ],
});
