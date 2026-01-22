import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    setupFiles: ["./setupTest.ts"],
    projects: [
      {
        test: {
          globals: true,
          name: "browser-ui",
          root: "./src",
          environment: "jsdom",
          css: true,
          browser: {
            headless: true,
            provider: playwright(),
            enabled: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [],
        },
      },
      {
        test: {
          name: "node",
          root: "./src/week2",
          environment: "node",
          setupFiles: [],
        },
      },
    ],
  },
});
