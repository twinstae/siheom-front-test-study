import { describe, it } from "vitest";
import { runSiheom, query, given, assertions, actions } from "../../siheom";
import { NewTransactionForm } from "./NewTransactionForm";
import * as Stories from "./NewTransactionForm.stories";

describe("NewTransactionForm", () => {
  it("새 거래를 추가할 수 있다", async () => {
    return runSiheom(
      given.render(<NewTransactionForm {...Stories.Empty.args} />),

      // 거래 일자 입력
      // 거래 설명 입력
      // 분개 추가
      // 계정과목 선텍
      // 금액 입력
      // 통화 선택

      // 태그 추가
    );
  });

  it("아무 값도 입력하지 않고 거래를 추가할 수 없다", async () => {
    return runSiheom(
      given.render(<NewTransactionForm {...Stories.Empty.args} />),

      actions.click(query.button("거래 추가하기")),

      // 거래 일자 : 거래 일자를 입력해주세요
      // 거래 설명 : 거래 설명을 입력해주세요
      // 차변과 대변의 계정과목을 입력해주세요

      // tag는 필수가 아님
    );
  });

  it("차변 대변의 합이 0이 아니면 추가할 수 없다", async () => {
    return runSiheom(
      given.render(<NewTransactionForm {...Stories.NotBalanced.args} />),

      actions.click(query.button("거래 추가하기")),

      assertions.visible(query.alert("차변과 대변의 합이 0이 아닙니다")),
    );
  });
});
