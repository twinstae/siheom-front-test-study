import { Plus, Trash01 } from "@untitledui/icons";
import { useId } from "react";
import {
  ACCOUNT_LIST,
  COMMODITY_LIST,
  type SimpleTransaction,
  type ValidTransaction,
} from "../../week2/transaction/type";
import { Button } from "../../components/base/buttons/button";
import { validTransactionSchema } from "../../week2/transaction/parser";
import {
  SimpleComboboxWithSelect,
  SimpleDatePicker,
  SimpleInput,
  SimpleMultiSelect,
  SimpleNumberInputGroup,
  SimpleSelect,
} from "./SimpleField";
import { SimpleForm } from "./SimpleForm";
import { useFormContext, useWatch } from "react-hook-form";
import { SimpleErrorMessage } from "./SimpleErrorMessage";

export function NewTransactionForm({
  addTransaction,
  initTransaction,
}: {
  addTransaction: (transaction: ValidTransaction) => Promise<void>;
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
  const formTitleId = useId();

  return (
    <SimpleForm
      schema={validTransactionSchema}
      defaultValues={{
        __brand: "ValidTransaction",
        date: undefined,
        description: "",
        postings: [],
        tags: [],
        ...initTransaction,
      }}
      className="flex flex-col gap-2 max-w-4xl w-full"
      aria-labelledby={formTitleId}
      onSubmit={addTransaction}
    >
      <h2 className="text-2xl font-bold" id={formTitleId}>
        {" "}
        새 거래 추가하기
      </h2>
      <SimpleDatePicker name="date" label="거래 일자" />

      {/* 거래 설명 TextField */}
      <SimpleInput name="description" label="거래 설명" />

      {/* 분개 postings */}
      <PostingsFieldSet />

      {/* 태그 tags Select with combobox tags*/}
      <SimpleMultiSelect
        name="tags"
        label="태그"
        items={["구매"].map((tag) => ({ id: tag, label: tag }))}
      />

      <Button type="submit" size="lg" color="primary" className="mt-2">
        거래 추가하기
      </Button>
    </SimpleForm>
  );
}

function PostingsFieldSet() {
  const { control, getValues, setValue } = useFormContext();

  const postingsLength = useWatch({
    compute: (values) => values.postings?.length ?? 0,
    control,
  });

  return (
    <fieldset className="flex flex-col gap-2">
      <legend
        className={"flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary"}
      >
        분개
      </legend>
      <ul>
        {Array.from({ length: postingsLength }).map((_, index) => (
          <li
            key={index}
            className="ml-4 mb-2 flex flex-col md:flex-row gap-1 shadow-sm rounded p-2"
          >
            {/* 계정과목 Select With Combobox */}
            <SimpleComboboxWithSelect
              className="min-w-sm"
              name={`postings.${index}.account`}
              label={"계정과목 " + (index + 1)}
              items={ACCOUNT_LIST.map((account) => ({
                id: account,
                label: account,
              }))}
            />
            {/* 금액 amount NumberInput */}
            <SimpleNumberInputGroup
              name={`postings.${index}.amount`}
              className="max-w-xl"
              isRequired
              label={`금액 ${index + 1}`}
              trailingAddon={
                // 통화 commodity Select
                <SimpleSelect
                  className="min-w-24"
                  name={`postings.${index}.commodity`}
                  label={`통화 ${index + 1}`}
                  items={COMMODITY_LIST.map((commodity) => ({
                    label: commodity,
                    id: commodity,
                  }))}
                />
              }
            />

            <Button
              className="mt-6.5"
              iconLeading={Trash01}
              color="secondary-destructive"
              size="md"
              onClick={() => {
                const oldPostings = getValues("postings") as SimpleTransaction["postings"];
                setValue("postings", oldPostings?.filter((_, i) => i !== index) ?? []);
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
              const oldPostings = getValues("postings");
              setValue("postings", [
                ...(oldPostings ?? []),
                {
                  account: "",
                  amount: 0,
                  commodity: "KRW",
                },
              ]);
            }}
          >
            새 계정과목 추가하기
          </Button>
        </li>
      </ul>
      <SimpleErrorMessage name="postings" />
    </fieldset>
  );
}
