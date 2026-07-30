import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve the library to source for HMR while developing inside this repo.
      "spatialboard/style.css": resolve(__dirname, "../../src/styles/index.css"),
      spatialboard: resolve(__dirname, "../../src/index.ts"),
    },
  },
});
