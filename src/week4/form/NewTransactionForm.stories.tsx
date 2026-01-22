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
// 빈 경우

// 올바른 값을 넣은 경우

// 차변과 대변의 합이 0이 아닌 경우
