import { parseDate } from "@internationalized/date";
import type { ComponentProps, ReactNode } from "react";
import React, { useCallback } from "react";
import { useListData } from "react-aria-components";
import { Controller, useFormContext } from "react-hook-form";

import { DatePicker } from "../../components/application/date-picker/date-picker";
import { Input, InputBase } from "../../components/base/input/input";
import { InputGroup } from "../../components/base/input/input-group";
import { Label } from "../../components/base/input/label";
import { MultiSelect } from "../../components/base/select/multi-select";
import { Select, type SelectItemType } from "../../components/base/select/select";
import invariant from "../../week2/invariant";
import { SimpleErrorMessage } from "./SimpleErrorMessage";

export function SimpleDatePicker({ name, label }: { name: string; label: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <div>
          <Label>{label}</Label>
          <DatePicker
            name={name}
            aria-label={label}
            isInvalid={fieldState.invalid}
            value={field.value ? parseDate(field.value) : null}
            onChange={(value) => field.onChange(value?.toString())}
          />
          <SimpleErrorMessage name={name} />
        </div>
      )}
      control={control}
      name={name}
    />
  );
}

export function SimpleInput({
  name,
  label,
  ...props
}: ComponentProps<typeof Input> & { name: string; label: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Input
          name={name}
          label={label}
          isRequired
          value={field.value}
          onChange={field.onChange}
          {...props}
          isInvalid={fieldState.invalid}
          hint={fieldState.error?.message}
        />
      )}
      control={control}
      name={name}
    />
  );
}

const defaultRender = (item: SelectItemType) => (
  <Select.Item
    id={item.id}
    supportingText={item.supportingText}
    isDisabled={item.isDisabled}
    icon={item.icon}
    avatarUrl={item.avatarUrl}
  >
    {item.label}
  </Select.Item>
);

export function SimpleComboboxWithSelect({
  name,
  label,
  items,
  ...props
}: Omit<ComponentProps<typeof Select.ComboBox>, "children"> & {
  name: string;
  label: string;
  items: SelectItemType[];
  children?: (item: SelectItemType) => ReactNode;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Select.ComboBox
          name={name}
          label={label}
          items={items}
          selectedKey={field.value}
          onSelectionChange={(selectedKey) => {
            field.onChange(selectedKey);
          }}
          isInvalid={fieldState.invalid}
          hint={fieldState.error?.message}
          {...props}
        >
          {props.children ?? defaultRender}
        </Select.ComboBox>
      )}
      control={control}
      name={name}
    />
  );
}

export function SimpleSelect({
  name,
  label,
  items,
  ...props
}: Omit<ComponentProps<typeof Select>, "children"> & {
  name: string;
  label: string;
  items: SelectItemType[];
  children?: (item: SelectItemType) => ReactNode;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Select
          name={name}
          aria-label={label}
          items={items}
          value={field.value}
          onChange={field.onChange}
          isInvalid={fieldState.invalid}
          hint={fieldState.error?.message}
          {...props}
        >
          {props.children ?? defaultRender}
        </Select>
      )}
      control={control}
      name={name}
    />
  );
}

export function SimpleInputGroup({
  name,
  label,
  ...props
}: Omit<ComponentProps<typeof InputGroup>, "children"> & {
  name: string;
  label: string;
  children?: ReactNode;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <InputGroup
          isRequired
          name={name}
          label={label}
          value={field.value?.toString()}
          onChange={field.onChange}
          isInvalid={fieldState.invalid}
          hint={fieldState.error?.message}
          {...props}
        >
          <InputBase name={name} />
        </InputGroup>
      )}
      control={control}
      name={name}
    />
  );
}

function parseSafeNumber(input?: string): number | undefined {
  if (!input) return undefined;

  // 허용: 음수, 소수점, 숫자만 유지
  const cleaned = input.replace(/[^0-9.-]/g, "");

  // 입력 중간 상태는 아직 값으로 확정하지 않음
  if (cleaned === "-" || cleaned === "." || cleaned === "-." || cleaned === "") {
    return undefined;
  }

  const result = Number(cleaned);

  invariant(!Number.isNaN(result), "Invalid number input: " + input);
  return result;
}

export function SimpleNumberInputGroup({
  name,
  label,
  shortcut,
  ...props
}: Omit<ComponentProps<typeof InputGroup>, "children"> & {
  name: string;
  label: string;
  shortcut?: string | ((value: number) => string);
}) {
  const { control } = useFormContext();

  const render = useCallback(
    ({ field, fieldState }: Parameters<ComponentProps<typeof Controller>["render"]>[0]) => {
      const [innerValue, setInnerValue] = React.useState(field.value?.toString() ?? "");

      React.useEffect(() => {
        setInnerValue(field.value?.toString() ?? "");
      }, [field.value]);

      return (
        <InputGroup
          name={name}
          isRequired
          label={label}
          value={innerValue}
          isInvalid={fieldState.invalid}
          hint={fieldState.error?.message}
          onChange={(value) => {
            setInnerValue(value.replace(/[^0-9.-]/g, ""));

            const parsed = parseSafeNumber(value);

            if (parsed !== undefined) {
              field.onChange(parsed);
            }
          }}
          {...props}
        >
          <InputBase
            name={name}
            maxLength={14}
            shortcut={
              typeof shortcut === "function"
                ? field.value
                  ? shortcut(field.value)
                  : undefined
                : shortcut
            }
          />
        </InputGroup>
      );
    },
    [name, label, props],
  );

  return <Controller control={control} name={name} render={render} />;
}

export function SimpleMultiSelect({
  name,
  label,
  items,
  ...props
}: Omit<ComponentProps<typeof MultiSelect>, "children" | "selectedItems"> & {
  name: string;
  label: string;
  items: SelectItemType[];
  children?: (item: SelectItemType) => ReactNode;
}) {
  const { control, getValues } = useFormContext();

  const value = getValues(name);

  const selectedItems = useListData({
    initialItems: items.filter((item) => value?.includes(item.id)) as SelectItemType[],
  });

  return (
    <Controller
      render={({ field, fieldState }) => (
        <MultiSelect
          name={name}
          label={label}
          selectedItems={selectedItems}
          isInvalid={fieldState.invalid}
          hint={fieldState.error?.message}
          items={items}
          onItemInserted={(selectedKey) => {
            field.onChange([...field.value, selectedKey]);
          }}
          onItemCleared={(selectedKey) => {
            const old = field.value;
            invariant(Array.isArray(old));
            field.onChange(old.filter((id) => id !== selectedKey));
          }}
          {...props}
        >
          {(item) => (
            <MultiSelect.Item id={item.id} label={item.label} isDisabled={item.isDisabled}>
              {item.label}
            </MultiSelect.Item>
          )}
        </MultiSelect>
      )}
      control={control}
      name={name}
    />
  );
}
