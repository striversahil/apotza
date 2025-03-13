import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@/routes": path.resolve(__dirname, "./_routes"),
      "@/src": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    host: "localhost",
  },
  plugins: [react()],
});
