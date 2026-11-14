import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // In development, send /api calls to the local backend (pnpm dev:backend).
    proxy: { "/api": "http://localhost:8080" },
  },
  build: { outDir: "dist", sourcemap: false },
});
