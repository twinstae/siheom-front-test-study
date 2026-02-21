import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleNumberInputGroup, SimpleSelect } from ".";
import { formDecorator } from "./formDecorator";
import { COMMODITY_LIST } from "../../week2/transaction/type";
import { numberToHangulMixed } from "es-hangul";

const commodityItems = COMMODITY_LIST.map((id) => ({ id, label: id }));

const meta = {
  title: "SimpleField/SimpleNumberInputGroup",
  component: SimpleNumberInputGroup,
} satisfies Meta<typeof SimpleNumberInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [formDecorator({ defaultValues: { amount: undefined, commodity: "KRW" } })],
  args: {
    name: "amount",
    label: "금액",
  },
};

export const WithInitialValue: Story = {
  decorators: [formDecorator({ defaultValues: { amount: 50000, commodity: "KRW" } })],
  args: {
    name: "amount",
    label: "금액",
  },
};

export const WithTrailingSelect: Story = {
  decorators: [
    formDecorator({
      defaultValues: { amount: 10000, commodity: "KRW" },
      className: "flex flex-col gap-4 max-w-xl",
    }),
  ],
  args: {
    name: "amount",
    label: "금액",
    className: "max-w-xl",
    shortcut: (value) => numberToHangulMixed(value),
    trailingAddon: (
      <SimpleSelect className="min-w-24" name="commodity" label="통화" items={commodityItems} />
    ),
  },
};
