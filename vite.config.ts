import { defineConfig } from "vitest/config";
import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "src") }],
  },
  envPrefix: "VAROSA_",
  test: {
    globals: true,

    environment: "jsdom",

    setupFiles: "./setupTests.cjs",
  },
});
