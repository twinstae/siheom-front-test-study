// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TransactionList } from "./TransactionList";

//👇 This default export determines where your story goes in the story list
const meta = {
  component: TransactionList,
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    transactions: [],
  },
};
