import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Three entries: the main React board (`.`), the opt-in rich-text node
      // (`./blocknote`), and the headless engine (`./engine`). Rollup code-splits
      // shared code into `chunks/*`; the @blocknote/@mantine graph stays reachable
      // ONLY from `blocknote.js`, and `engine.js` pulls no React/CSS/font asset —
      // so each entry carries only the edges it needs.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        blocknote: resolve(__dirname, "src/blocknote.ts"),
        engine: resolve(__dirname, "src/engine.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@blocknote\//,
        /^@mantine\//,
      ],
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
    cssCodeSplit: false,
    // Vite lib mode inlines assets regardless of this limit (verified: fonts
    // stay base64 even at the 4096 default). Kept explicit so the intent —
    // bundled fonts ride inside index.js — survives a Vite behavior change.
    assetsInlineLimit: 100_000,
  },
});
