import { ACCOUNT_LIST, COMMODITY_LIST } from "../../week2/transaction/type";
import { Button } from "../../components/base/buttons/button";
import { DatePicker } from "../../components/application/date-picker/date-picker";
import { Label } from "../../components/base/input/label";
import { Input, InputBase } from "../../components/base/input/input";
import { Plus, Trash01 } from "@untitledui/icons";
import { useState } from "react";
import { Select, type SelectItemType } from "../../components/base/select/select";
import { InputGroup } from "../../components/base/input/input-group";
import { MultiSelect } from "../../components/base/select/multi-select";
import { useListData } from "react-aria-components";

export function NewTransactionForm({
  initTransaction,
}: {
  initTransaction: Partial<{
    date: string; // 어떤 포맷일까?
    description: string; // 몇 자까지 가능할까?
    postings: Partial<{
      account: string; // 올바른 종류는 무엇이 있을까?
      amount: number; // 0 이상, 0 이하일 수도 있을까?
      commodity: string; // 'KRW' 말고 다른 것도 있을까? 어떻게 알지?
    }>[];
    tags: string[]; // 몇 개까지 가능할까? 미리 지정된 것만 가능한가?
  }>;
}) {
  const [state, setState] = useState(initTransaction);

  const selectedItems = useListData({
    initialItems: [] as SelectItemType[],
});
  return (
    <form className="flex flex-col gap-2 max-w-4xl">
      {/* 거래 일자 DatePicker */}
      <Label>거래 일자</Label>
      <DatePicker name="date" aria-label="거래 일자" />

      {/* 거래 설명 TextField */}
      <Input name="description" label="거래 설명" isRequired />

      {/* 분개 postings */}
      <fieldset className="flex flex-col gap-2">
        <legend
          className={"flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary"}
        >
          분개
        </legend>
        <ul>
          {(state.postings ?? []).map((posting, index) => (
            <li
              key={index}
              className="ml-4 mb-2 flex flex-col sm:flex-row gap-1 shadow-sm rounded p-2"
            >
              {/* 계정과목 Select With Combobox */}
              <Select.ComboBox
                name={`postings[${index}].account`}
                isRequired
                className="min-w-md"
                label={"계정과목 " + (index + 1)}
                items={ACCOUNT_LIST.map((account) => ({
                  id: account,
                  label: account,
                }))}
              >
                {(item) => (
                  <Select.Item
                    id={item.id}
                    supportingText={item.supportingText}
                    isDisabled={item.isDisabled}
                    icon={item.icon}
                    avatarUrl={item.avatarUrl}
                  >
                    {item.label}
                  </Select.Item>
                )}
              </Select.ComboBox>
              {/* 금액 amount NumberInput */}
              <InputGroup
                className="max-w-xl"
                isRequired
                label={`금액 ${index + 1}`}
                trailingAddon={
                  // 통화 commodity Select
                  <Select
                    name={`postings[${index}].commodity`}
                    aria-label={`통화 ${index + 1}`}
                    items={COMMODITY_LIST.map((commodity) => ({
                      label: commodity,
                      id: commodity,
                    }))}
                  >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                  </Select>
                }
              >
                <InputBase name={`postings[${index}].amount`} />
              </InputGroup>

              <Button
                className="self-end"
                iconLeading={Trash01}
                color="secondary-destructive"
                size="md"
                onClick={() => {
                  setState((old) => ({
                    ...old,
                    postings: old.postings?.filter((_, i) => i !== index),
                  }));
                }}
                aria-label={`계정과목 ${index + 1} 삭제하기`}
              />
            </li>
          ))}
          <li className="ml-4">
            <Button
              className="w-full"
              color="secondary"
              iconLeading={Plus}
              onClick={() => {
                setState((old) => ({
                  ...old,
                  postings: [
                    ...(old.postings ?? []),
                    {
                      account: "",
                      amount: 0,
                      commodity: "KRW",
                    },
                  ],
                }));
              }}
            >
              새 계정과목 추가하기
            </Button>
          </li>
        </ul>
      </fieldset>

      {/* 태그 tags Select with combobox tags*/}
      <MultiSelect
        isRequired
        label="태그"
        selectedItems={selectedItems}
        items={[
          { id: "구매", label: "구매" }, // TODO: 태그는 기존 목록에서만 선택할 수 있는가?
        ]}
      >
        {(item) => (
          <MultiSelect.Item
            id={item.id}
            supportingText={item.supportingText}
            isDisabled={item.isDisabled}
            icon={item.icon}
            avatarUrl={item.avatarUrl}
          >
            {item.label}
          </MultiSelect.Item>
        )}
      </MultiSelect>

      <Button type="submit" size="lg" color="primary" className="mt-2">
        거래 추가하기
      </Button>
    </form>
  );
}
