import { describe, it, expect } from "bun:test";
import { notBalancedTransaction, validTransaction } from "./fixtures";
import { parseTransaction } from "./parser";
import { Temporal } from "temporal-polyfill";

describe("parseTransaction", () => {
  it("balance가 0이 맞는 경우", async () => {
    const result = parseTransaction(validTransaction);

    expect(result).toStrictEqual({
      __brand: "ValidTransaction",
      date: Temporal.PlainDate.from(validTransaction.date),
      description: "김토끼가 또 출자함",
      postings: [
        {
          account: "자본:출자금",
          amount: 10000,
          commodity: "KRW",
        },
        {
          account: "자산:현금",
          amount: -10000,
          commodity: "KRW",
        },
      ],
      tags: ["출자"],
    });

    expect(result.date.toString()).toBe(validTransaction.date);
  });

  it("balance가 0이 안 맞는 경우", async () => {
    expect(() => parseTransaction(notBalancedTransaction)).toThrow("Transaction is not balanced");
  });
});
