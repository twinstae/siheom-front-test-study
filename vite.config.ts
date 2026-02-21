import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart({
      spa: {
        enabled: true
      }
    }),
    // react's vite plugin must come after start's vite plugin

    viteReact(),
  ] as any,
  test: {
    setupFiles: ["./setupTest.ts"],
    coverage: {
      exclude: [
        "./test.css",
        "./src/siheom",
        "./src/components",
        "./src/hooks/use-resize-observer.ts",
        "**/*.stories.tsx",
      ],
    },
    projects: [
      {
        test: {
          globals: true,
          name: "browser-ui",
          environment: "jsdom",
          css: true,
          browser: {
            headless: true,
            provider: playwright(),
            enabled: true,
            instances: [{ browser: "chromium" }],
          },
          include: ["src/**/*.test.tsx"],
          setupFiles: ["./setupTest.ts"],
        },
      },
      {
        test: {
          name: "node",
          environment: "node",
          include: ["src/**/*.test.ts"],
          setupFiles: [],
        },
      },
    ],
  },
});
