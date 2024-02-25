import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import viteReact from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        viteReact(),
    ],
    resolve: {
        alias: {find: '@', replacement: path.resolve(__dirname, '/resources/js')}
    }
});
