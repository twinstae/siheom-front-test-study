import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleInput } from ".";
import { formDecorator } from "./formDecorator";

const meta = {
  title: "SimpleField/SimpleInput",
  component: SimpleInput,
} satisfies Meta<typeof SimpleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { description: "" } })],
  args: {
    name: "description",
    label: "거래 설명",
  },
};

export const WithPlaceholder: Story = {
  decorators: [formDecorator({ defaultValues: { description: "" } })],
  args: {
    name: "description",
    label: "거래 설명",
    placeholder: "예: 점심 식사비",
  },
};

export const WithInitialValue: Story = {
  decorators: [formDecorator({ defaultValues: { description: "오늘 점심 식사" } })],
  args: {
    name: "description",
    label: "거래 설명",
  },
};
