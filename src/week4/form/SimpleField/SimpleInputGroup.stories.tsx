import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleInputGroup } from "../SimpleField";
import { formDecorator } from "./formDecorator";

const meta = {
  title: "SimpleField/SimpleInputGroup",
  component: SimpleInputGroup,
} satisfies Meta<typeof SimpleInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { testField: undefined } })],
  args: {
    name: "testField",
    label: "테스트 필드",
  },
};

export const WithInitialString: Story = {
  decorators: [formDecorator({ defaultValues: { testField: "초기값" } })],
  args: {
    name: "testField",
    label: "테스트 필드",
  },
};

export const WithInitialNumber: Story = {
  decorators: [formDecorator({ defaultValues: { testField: 123 } })],
  args: {
    name: "testField",
    label: "테스트 필드",
  },
};
