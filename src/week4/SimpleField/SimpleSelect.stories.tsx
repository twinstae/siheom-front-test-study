import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleSelect } from ".";
import { formDecorator } from "./formDecorator";
import { COMMODITY_LIST } from "../../week2/transaction/type";

const commodityItems = COMMODITY_LIST.map((id) => ({ id, label: id }));

const meta = {
  title: "SimpleField/SimpleSelect",
  component: SimpleSelect,
} satisfies Meta<typeof SimpleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { commodity: "KRW" } })],
  args: {
    name: "commodity",
    label: "통화",
    items: commodityItems,
  },
};

export const Unselected: Story = {
  decorators: [formDecorator({ defaultValues: { commodity: "" } })],
  args: {
    name: "commodity",
    label: "통화",
    items: commodityItems,
  },
};
