import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve library imports to source for HMR during development
      "spatialboard/style.css": resolve(__dirname, "../../src/styles/index.css"),
      // Subpath aliases MUST precede the bare `spatialboard` alias — otherwise its
      // prefix match rewrites `spatialboard/blocknote` to `src/index.ts/blocknote`.
      "spatialboard/blocknote": resolve(__dirname, "../../src/blocknote.ts"),
      "spatialboard/engine": resolve(__dirname, "../../src/engine.ts"),
      spatialboard: resolve(__dirname, "../../src/index.ts"),
    },
  },
});
