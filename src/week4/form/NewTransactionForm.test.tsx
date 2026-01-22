import { describe, it } from "vitest";
import { runSiheom, query, given, assertions, actions } from "../../siheom";
import { NewTransactionForm } from "./NewTransactionForm";
import * as Stories from "./NewTransactionForm.stories";

describe("NewTransactionForm", () => {
  it("새 거래를 추가할 수 있다", async () => {
    return runSiheom(
      given.render(<NewTransactionForm {...Stories.Empty.args} />),

      actions.click(query.button("달력 거래 일자")),
      actions.fill(query.spinbutton("년, 거래 일자"), "2025"),
      actions.fill(query.spinbutton("월, 거래 일자"), "12"),
      actions.fill(query.spinbutton("일, 거래 일자"), "25"),

      actions.click(query.button("Apply")),

      actions.fill(query.textbox("거래 설명*"), "김토끼가 라즈베리파이를 구매함"),

      actions.click(query.button("새 계정과목 추가하기")),

      actions.fill(query.combobox(/계정과목 1/), "자산:유동자산:당좌자산:"),
      actions.click(query.option("자산:유동자산:당좌자산:현금및현금성자산:현금")),

      actions.fill(query.textbox(/금액 1/), "120000"),

      actions.click(query.button(/통화 1/)),
      actions.click(query.option("KRW")),

      actions.click(query.button("새 계정과목 추가하기")),

      actions.click(query.button("새 계정과목 추가하기")),

      actions.click(query.button("계정과목 3 삭제하기")),

      actions.fill(query.combobox(/계정과목 2/), "자산:비유동자산:유형자산:"),
      actions.click(query.option("자산:비유동자산:유형자산:기계장치")),

      actions.fill(query.textbox(/금액 2/), "120000"),

      actions.click(query.button(/통화 2/)),
      actions.click(query.option("KRW")),

      actions.fill(query.combobox(/태그/), "구매"),
      actions.click(query.option("구매")),
      actions.fill(query.combobox(/태그/), "{Escape}"),

      actions.click(query.button("거래 추가하기")),
    );
  });

  // it("아무 값도 입력하지 않고 거래를 추가할 수 없다", async () => {
  //   return runSiheom(
  //     given.render(<NewTransactionForm {...Stories.Empty.args} />),

  //     actions.click(query.button("거래 추가하기")),

  //     assertions.errormessage(query.textbox("거래 일자"), "거래 일자를 입력해주세요"),
  //     assertions.errormessage(query.textbox("거래 설명"), "거래 설명을 입력해주세요"),
  //     assertions.visible(query.alert("차변과 대변의 계정과목을 입력해주세요")),

  //     // tag는 필수가 아님
  //   );
  // });

  // it("차변 대변의 합이 0이 아니면 추가할 수 없다", async () => {
  //   return runSiheom(
  //     given.render(<NewTransactionForm {...Stories.NotBalanced.args} />),

  //     actions.click(query.button("거래 추가하기")),

  //     assertions.visible(query.alert("차변과 대변의 합이 0이 아닙니다")),
  //   );
  // });
});
