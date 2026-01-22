import { describe, it } from "vitest";
import { runSiheom, query, given, assertions } from "../../siheom";
import { TransactionList } from "./TransactionList";
import * as Stories from "./TransactionList.stories";
import { parseTransaction } from "../../week2/transaction/parser";
import { validSimpleTransaction } from "../../week2/transaction/fixtures";

describe("TransactionList", () => {
  it("거래가 없으면, 거래가 없다고 한다", async () => {
    return runSiheom(
      given.render(<TransactionList {...Stories.Empty.args} />),

      assertions.visible(query.list("거래 목록")),
      assertions.visible(query.text("거래가 없습니다.")),
    );
  });

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

  it("자산 계정은 gray 색상으로 표시됨", async () => {
    const transaction = parseTransaction(validSimpleTransaction);

    return runSiheom(
      given.render(<TransactionList transactions={[transaction]} />),
      assertions.visible(query.text("자산:현금")),
    );
  });
});
