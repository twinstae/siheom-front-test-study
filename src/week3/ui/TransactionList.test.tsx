import { describe, it } from "vitest";
import { runSiheom, query, given, assertions } from "../../siheom";
import { TransactionList } from "./TransactionList";
import * as Stories from "./TransactionList.stories";

describe("TransactionList", () => {
  it("거래가 없으면, 거래가 없다고 한다", async () => {
    return runSiheom(
      given.render(<TransactionList {...Stories.Empty.args} />),

      assertions.visible(query.list("거래 목록")),
      assertions.visible(query.text("거래가 없습니다.")),
    );
  });
});
