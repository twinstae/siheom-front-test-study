// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TransactionList } from "./TransactionList";
import { parseTransaction } from "../../week2/transaction/parser";
import { TestSimpleTransactionList } from "../../week2/transaction/fixtures";

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

const TEST_VALID_TRANSACTION_LIST = TestSimpleTransactionList.map((item) => parseTransaction(item));

export const WithData: Story = {
  args: {
    transactions: TEST_VALID_TRANSACTION_LIST,
  },
};
