import { describe, expect, it } from "vitest";
import { runSiheom, query, given, assertions, actions } from "../siheom";
import { TransactionList } from "./TransactionList";
import * as Stories from "./TransactionList.stories";
import { getId } from '../week2/transaction/domain';
import { parseTransaction } from '../week2/transaction/parser';
import { emailServiceFeeTransaction } from '../week2/transaction/fixtures';

describe("TransactionList", () => {
  // 비어 있는 경우
  it("비어 있는 경우에는 거래 추가하기 링크가 보여야한다", async () => {
    return runSiheom(
      // given 이전 상태, 셋업
      given.render(
        <TransactionList {...Stories.Empty.args} />
      ),

      // when 사용자의 동작, mutation

      // then 이후 상태, 결과
      assertions.visible(query.text("거래 내역이 없습니다"))
    );
  })
  
  // 1개? 여러 개 있는 경우
it("거래가 있으면, 거래 내역을 보여준다", async () => {
    return runSiheom(
      given.render(<TransactionList {...Stories.WithData.args} />),
      assertions.visible(query.heading("굿즈 판매 매출")),

      assertions.a11ySnapshot(
        query.list("거래 목록"),
        "__snapshot__/transaction-list-with-data.snap",
      ),
    );
  });

  it("복사하기 버튼을 누르면, id가 선택된다", async () => {
    let selectedId: string | null = null;

    await runSiheom(
      given.render(<TransactionList {...Stories.WithData.args} selectId={(id) => {
        selectedId = id;
      }} />),
      actions.click(query.button("이메일 서비스 1년 이용료 복사하기")),
    );

    expect(selectedId).toBe(getId(parseTransaction(emailServiceFeeTransaction)));
  });
});
