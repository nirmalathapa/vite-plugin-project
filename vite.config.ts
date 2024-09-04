import { defineConfig } from "vite";
import markdownProcessor from "./vite-plugin-markdown-processor";

export default defineConfig({
  plugins: [markdownProcessor()],
});
