import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve the library to source for HMR while developing inside this repo.
      "spatialboard/style.css": resolve(__dirname, "../../src/styles/index.css"),
      // Subpath aliases MUST precede the bare `spatialboard` alias — otherwise its
      // prefix match rewrites `spatialboard/blocknote` to `src/index.ts/blocknote`.
      "spatialboard/blocknote": resolve(__dirname, "../../src/blocknote.ts"),
      spatialboard: resolve(__dirname, "../../src/index.ts"),
    },
  },
});
