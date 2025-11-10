import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://ratewise-api-production.up.railway.app",
        changeOrigin: true,
        secure: true,
        // rewrite the local /api/... to /api/v1/... on the target
        rewrite: (p) => p.replace(/^\/api/, "/api/v1"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
