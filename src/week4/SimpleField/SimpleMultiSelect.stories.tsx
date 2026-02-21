import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleMultiSelect } from ".";
import { formDecorator } from "./formDecorator";

const tagItems = ["구매", "식비", "교통비", "문화생활"].map((tag) => ({ id: tag, label: tag }));

const meta = {
  title: "SimpleField/SimpleMultiSelect",
  component: SimpleMultiSelect,
} satisfies Meta<typeof SimpleMultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { tags: [] } })],
  args: {
    name: "tags",
    label: "태그",
    items: tagItems,
  },
};

export const WithInitialValue: Story = {
  decorators: [formDecorator({ defaultValues: { tags: ["구매", "식비"] } })],
  args: {
    name: "tags",
    label: "태그",
    items: tagItems,
  },
};
