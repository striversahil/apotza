import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config.js";
import type { Plugin } from "postcss";

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer] as Plugin[],
};
