import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve library imports to source for HMR during development
      "spatialboard/style.css": resolve(__dirname, "../../src/styles/index.css"),
      spatialboard: resolve(__dirname, "../../src/index.ts"),
    },
  },
});
