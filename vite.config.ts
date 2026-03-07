import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "spatialboard",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@blocknote\//,
        /^@mantine\//,
        /^@imgly\//,
      ],
    },
    cssCodeSplit: false,
    assetsInlineLimit: 100_000, // inline bundled fonts (Excalifont ~52KB) as base64
  },
});
