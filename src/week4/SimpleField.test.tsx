import { describe, it } from "vitest";
import { runSiheom, query, given, assertions, actions } from "../siheom";
import { SimpleForm } from "./SimpleForm";
import {
  SimpleInputGroup,
  SimpleMultiSelect,
  SimpleNumberInputGroup,
  SimpleComboboxWithSelect,
} from "./SimpleField";
import type { SelectItemType } from "../components/base/select/select";
import type { StandardSchemaV1 } from "@standard-schema/spec";

const simpleSchema: StandardSchemaV1<
  {
    testField?: string | number;
    testMultiSelect?: string[];
    testNumber?: number;
    testCombobox?: string | null;
  },
  {
    testField?: string | number;
    testMultiSelect?: string[];
    testNumber?: number;
    testCombobox?: string | null;
  }
> = {
  "~standard": {
    validate: (data) => ({ value: data }),
  },
} as StandardSchemaV1<
  {
    testField?: string | number;
    testMultiSelect?: string[];
    testNumber?: number;
    testCombobox?: string | null;
  },
  {
    testField?: string | number;
    testMultiSelect?: string[];
    testNumber?: number;
    testCombobox?: string | null;
  }
>;

describe("SimpleInputGroup", () => {
  it("field.value가 undefined일 때 빈 문자열로 표시됨", async () => {
    return runSiheom(
      given.render(
        <SimpleForm
          schema={simpleSchema}
          defaultValues={{ testField: undefined }}
          onSubmit={async () => {}}
        >
          <SimpleInputGroup name="testField" label="Test Label" />
        </SimpleForm>,
      ),
      assertions.visible(query.textbox(/Test Label/)),
    );
  });

  it("field.value가 숫자일 때 문자열로 표시됨", async () => {
    return runSiheom(
      given.render(
        <SimpleForm
          schema={simpleSchema}
          defaultValues={{ testField: 123 }}
          onSubmit={async () => {}}
        >
          <SimpleInputGroup name="testField" label="Test Label" />
        </SimpleForm>,
      ),
      assertions.visible(query.textbox(/Test Label/)),
    );
  });
});

describe("SimpleMultiSelect", () => {
  const items: SelectItemType[] = [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2" },
    { id: "item3", label: "Item 3" },
  ];

  it("태그를 제거할 수 있음", async () => {
    // 단일 태그만 있는 경우로 테스트하여 여러 버튼 문제 회피
    return runSiheom(
      given.render(
        <SimpleForm
          schema={simpleSchema}
          defaultValues={{ testMultiSelect: ["item1"] }}
          onSubmit={async () => {}}
        >
          <SimpleMultiSelect name="testMultiSelect" label="Test MultiSelect" items={items} />
        </SimpleForm>,
      ),
      // 태그가 표시됨
      assertions.visible(query.button(/Item 1/)),
      // "Remove this tag" 버튼 클릭
      actions.click(query.button(/Remove Item 1/)),
      // 태그가 제거됨
      assertions.not.visible(query.button(/Item 1/)),
    );
  });
});

describe("SimpleNumberInputGroup", () => {
  it("initial value가 undefined일 때 빈 문자열로 표시됨", async () => {
    return runSiheom(
      given.render(
        <SimpleForm
          schema={simpleSchema}
          defaultValues={{ testNumber: undefined }}
          onSubmit={async () => {}}
        >
          <SimpleNumberInputGroup name="testNumber" label="Test Number" />
        </SimpleForm>,
      ),
      assertions.visible(query.textbox(/Test Number/)),
    );
  });
});

describe("SimpleComboboxWithSelect", () => {
  const items: SelectItemType[] = [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2" },
    { id: "item3", label: "Item 3" },
  ];

  it("selectedKey가 null일 때 undefined로 변환됨", async () => {
    // initial value가 undefined인 경우 selectedKey는 null이 됨
    return runSiheom(
      given.render(
        <SimpleForm
          schema={simpleSchema}
          defaultValues={{ testCombobox: undefined }}
          onSubmit={async () => {}}
        >
          <SimpleComboboxWithSelect name="testCombobox" label="Test Combobox" items={items} />
        </SimpleForm>,
      ),
      assertions.visible(query.combobox("Test Combobox")),
      // combobox를 클릭하여 열기
      actions.click(query.combobox("Test Combobox")),
      // 옵션 선택 (selectedKey가 null에서 값으로 변경)
      actions.click(query.option("Item 1")),
      // 다시 combobox를 클릭하여 열기
      actions.click(query.combobox("Test Combobox")),
      // 선택된 항목을 다시 클릭하여 선택 해제 (null로 변경)
      // 또는 Backspace로 선택 해제
      actions.type(query.combobox("Test Combobox"), "{Backspace}"),
      // onSelectionChange에서 null이 전달되면 undefined로 변환되어야 함
    );
  });
});
