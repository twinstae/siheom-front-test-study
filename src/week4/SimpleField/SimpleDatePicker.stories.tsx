import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleDatePicker } from ".";
import { formDecorator } from "./formDecorator";

const meta = {
  title: "SimpleField/SimpleDatePicker",
  component: SimpleDatePicker,
} satisfies Meta<typeof SimpleDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { date: undefined } })],
  args: {
    name: "date",
    label: "거래 일자",
  },
};

export const WithInitialValue: Story = {
  decorators: [formDecorator({ defaultValues: { date: "2024-03-15" } })],
  args: {
    name: "date",
    label: "거래 일자",
  },
};
