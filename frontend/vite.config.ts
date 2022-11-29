import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import eslintPlugin from "vite-plugin-eslint";

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
    plugins: [react(), eslintPlugin()],
    define: {
        APP: { version: execSync("git rev-parse HEAD").toString().trim() },
    },
    server: {
        proxy: {
            "/api": "http://localhost:8080",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    const separateModule = ["firebase/app", "firebase/auth", "firebase/firestore"].find(module => id.includes(module));
                    if (separateModule) return separateModule;
                }
            }
        }
    }
});
