import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Two entries: the main React board (`.`) and the opt-in rich-text node
      // (`./blocknote`). Rollup code-splits shared code into `chunks/*`; the
      // @blocknote/@mantine graph stays reachable ONLY from `blocknote.js`, so
      // `index.js` (and the chunks it pulls) carry no heavy peer edge.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        blocknote: resolve(__dirname, "src/blocknote.ts"),
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
    assetsInlineLimit: 100_000, // inline bundled fonts (Excalifont ~52KB) as base64
  },
});
