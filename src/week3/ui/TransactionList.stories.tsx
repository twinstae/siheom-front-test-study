import type { Meta, StoryObj } from "@storybook/react-vite";

import { TransactionList } from "./TransactionList";
import { parseTransaction } from "../../week2/transaction/parser";
import { TestSimpleTransactionList } from "../../week2/transaction/fixtures";

const meta = {
  component: TransactionList,
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    transactions: []
  },
};

const TEST_VALID_TRANSACTION_LIST = TestSimpleTransactionList.map((item) => parseTransaction(item));

export const WithData: Story = {
  args: {
    transactions: TEST_VALID_TRANSACTION_LIST,
  },
};
