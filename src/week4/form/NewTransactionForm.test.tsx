import { describe, expect, it } from "vitest";
import { Temporal } from "temporal-polyfill";

import { runSiheom, query, given, assertions, actions } from "../../siheom";
import { NewTransactionForm } from "./NewTransactionForm";
import * as Stories from "./NewTransactionForm.stories";
import type { SimpleTransaction, ValidTransaction } from "../../week2/transaction/type";

function toSimpleTransaction(transaction: ValidTransaction): SimpleTransaction {
  return {
    date: transaction.date.toString(),
    description: transaction.description,
    postings: transaction.postings,
    tags: transaction.tags,
  };
}

function fillDate(label: string, date: Temporal.PlainDate) {
  return [
    actions.click(query.button("달력 " + label)),
    actions.fill(query.spinbutton("년, " + label), date.year.toString()),
    actions.fill(query.spinbutton("월, " + label), date.month.toString()),
    actions.fill(query.spinbutton("일, " + label), date.day.toString()),

    actions.click(query.button("Apply")),
  ];
}

describe("NewTransactionForm", () => {
  it("새 거래를 추가할 수 있다", async () => {
    let result: SimpleTransaction | undefined;

    await runSiheom(
      // given
      given.render(
        <NewTransactionForm
          {...Stories.Empty.args}
          addTransaction={async (transaction) => {
            result = toSimpleTransaction(transaction);
          }}
        />,
      ),

      // 값을 열심히 입력을 한다

      fillDate("거래 일자", Temporal.PlainDate.from("2025-12-25")),

      // 거래 설명 텍스트박스에 "김토끼가 라즈베리파이를 구매함" 입력하기
      actions.fill(query.textbox(/거래 설명/), "김토끼가 라즈베리파이를 구매함"),

      // 새 계정과목 추가하기 버튼을 클릭하기
      actions.click(query.button("새 계정과목 추가하기")),

      // 계정과목 1 콤보박스에 현금 입력하기
      actions.fill(query.combobox(/계정과목 1/), "현금"),
      // "자산:유동자산:당좌자산:현금및현금성자산:현금" 옵션을 선택하기
      actions.click(query.option("자산:유동자산:당좌자산:현금및현금성자산:현금")),
      // 금액 1 텍스트박스에 -120000 입력하기
      actions.fill(query.textbox(/금액 1/), "-120000"),

      // 통화 1 버튼을 클릭하고 KRW 옵션을 선택하기
      actions.click(query.button(/통화 1/)),
      actions.click(query.option("KRW")),

      actions.click(query.button("새 계정과목 추가하기")),
      actions.click(query.button("새 계정과목 추가하기")),

      actions.click(query.button("계정과목 3 삭제하기")),

      actions.fill(query.combobox(/계정과목 2/), "기계장치"),
      actions.click(query.option("자산:비유동자산:유형자산:기계장치")),
      actions.fill(query.textbox(/금액 2/), "120000"),

      actions.fill(query.combobox(/태그/), "구매"),
      actions.click(query.option("구매")),
      actions.type(query.combobox(/태그/), "{Escape}"),

      // submit함
      actions.click(query.button("거래 추가하기")),

      assertions.a11ySnapshot(
        query.form("새 거래 추가하기"),
        "__snapshot__/new-transaction-form-with-data.snap",
      ),
    );

    // then 올바른 값이 제출됨
    expect(result).toStrictEqual({
      date: "2025-12-25",
      description: "김토끼가 라즈베리파이를 구매함",
      postings: [
        {
          account: "자산:유동자산:당좌자산:현금및현금성자산:현금",
          amount: -120000,
          commodity: "KRW",
        },
        {
          account: "자산:비유동자산:유형자산:기계장치",
          amount: 120000,
          commodity: "KRW"
        },
      ],
      tags: ["구매"],
    });
  });

  it("아무 값도 입력하지 않고 거래를 추가할 수 없다", async () => {
    let result: SimpleTransaction | undefined;

    await runSiheom(
      given.render(
        <NewTransactionForm
          {...Stories.Empty.args}
          addTransaction={async (transaction) => {
            result = toSimpleTransaction(transaction);
          }}
        />,
      ),
      actions.click(query.button("거래 추가하기")),

      // aria-describedby 로 거래 일자 button에 "날짜를 입력해주세요"가 연결됨
      assertions.description(query.button(/거래 일자/), "날짜를 입력해주세요"),
      // aria-errormessage 로 거래 설명 textbox에 "설명을 입력해주세요"가 연결됨
      assertions.errormessage(query.textbox(/거래 설명/), "설명을 입력해주세요"),
      // role="alert"로 "차변과 대변의 계정과목을 입력해주세요"가 보임
      assertions.visible(query.alert("차변과 대변의 계정과목을 입력해주세요")),

      assertions.a11ySnapshot(
        query.form("새 거래 추가하기"),
        "__snapshot__/new-transaction-form-empty.snap",
      ),
    );

    expect(result).toBeUndefined();
  });

  it("차변 대변의 합이 0이 아니면 추가할 수 없다", async () => {
    let result: SimpleTransaction | undefined;

    await runSiheom(
      given.render(
        <NewTransactionForm
          {...Stories.NotBalanced.args}
          addTransaction={async (transaction) => {
            result = toSimpleTransaction(transaction);
          }}
        />,
      ),

      actions.click(query.button("거래 추가하기")),

      assertions.visible(query.alert("차변과 대변의 합이 0이 아닙니다")),
    );

    expect(result).toBeUndefined();
  });
});
