import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleComboboxWithSelect } from "../SimpleField";
import { formDecorator } from "./formDecorator";
import { ACCOUNT_LIST } from "../../../week2/transaction/type";

const accountItems = ACCOUNT_LIST.slice(0, 8).map((id) => ({ id, label: id }));

const meta = {
  title: "SimpleField/SimpleComboboxWithSelect",
  component: SimpleComboboxWithSelect,
} satisfies Meta<typeof SimpleComboboxWithSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { account: undefined } })],
  args: {
    name: "account",
    label: "계정과목",
    items: accountItems,
  },
};

export const WithInitialValue: Story = {
  decorators: [formDecorator({ defaultValues: { account: "자산:현금" } })],
  args: {
    name: "account",
    label: "계정과목",
    items: accountItems,
  },
};
