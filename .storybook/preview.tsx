import React from "react";
import type { Preview } from "@storybook/react";
import "../src/week3/ui/index.css";

const preview: Preview = {
  decorators: [(Story) => <Story />],
};

export default preview;
