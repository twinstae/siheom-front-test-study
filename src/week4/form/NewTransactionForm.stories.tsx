import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  notBalancedSimpleTransaction,
  validSimpleTransaction,
} from "../../week2/transaction/fixtures";
import { NewTransactionForm } from "./NewTransactionForm";

const meta = {
  component: NewTransactionForm,
} satisfies Meta<typeof NewTransactionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    addTransaction: async (result) => { console.log(result) },
    initTransaction: {},
  },
};

export const ValidData: Story = {
  args: {
    addTransaction: async (result) => { console.log(result) },
    initTransaction: validSimpleTransaction,
  },
};

export const NotBalanced: Story = {
  args: {
    addTransaction: async (result) => { console.log(result) },
    initTransaction: notBalancedSimpleTransaction,
  },
};
