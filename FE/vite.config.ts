import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslint({
            emitWarning: true,
            emitError: true,
            failOnError: false,
            failOnWarning: false,
            exclude: ["node_modules/**"],
        }),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
            srcDir: "src",
            filename: "my-sw.js",
        }),
    ],
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "./src") },
            { find: "@config", replacement: path.resolve(__dirname, "./src/config") },
            { find: "@models", replacement: path.resolve(__dirname, "./src/models") },
            {
                find: "@components",
                replacement: path.resolve(__dirname, "./src/components"),
            },
            {
                find: "@widgets",
                replacement: path.resolve(__dirname, "./src/widgets"),
            },
            {
                find: "@utils",
                replacement: path.resolve(__dirname, "./src/utils"),
            },
            {
                find: "@styles",
                replacement: path.resolve(__dirname, "./src/styles"),
            },
            {
                find: "@libs",
                replacement: path.resolve(__dirname, "./src/libs"),
            },
            {
                find: "@api",
                replacement: path.resolve(__dirname, "./src/api"),
            },
            {
                find: "@assets",
                replacement: path.resolve(__dirname, "./src/assets"),
            },
            {
                find: "@store",
                replacement: path.resolve(__dirname, "./src/store"),
            },
            {
                find: "@hooks",
                replacement: path.resolve(__dirname, "./src/hooks"),
            },
            {
                find: "@modules",
                replacement: path.resolve(__dirname, "./src/modules"),
            },
            {
                find: "@router",
                replacement: path.resolve(__dirname, "./src/router"),
            },
            {
                find: "@app",
                replacement: path.resolve(__dirname, "./src/app"),
            },
        ],
    },
});
