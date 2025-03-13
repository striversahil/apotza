import path from "path";
import { defineConfig } from "vite";
const postcss = require("./postcss.config.js");
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@/routes": path.resolve(__dirname, "./_routes"),
      "@/src": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
  },
  server: {
    port: 3001,
    host: "localhost",
  },
  css: {
    postcss,
  },
  plugins: [react()],
});
