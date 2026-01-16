// Replace your-framework with the framework you are using (e.g., react-vite, vue3-vite, angular, etc.)
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
};

export default config;
