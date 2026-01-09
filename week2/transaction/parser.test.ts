import { describe, it, expect } from "bun:test";
import { notBalancedTransaction, validTransaction } from "./fixtures";
import { parseTransaction } from "./parser";
import { Temporal } from "temporal-polyfill";
import * as v from 'valibot';
import invariant from "../invariant";

function safeTry<T>(fn: () => T): { result: T, error: undefined } | { result: undefined, error: unknown } {
  try {
    return { result: fn(), error: undefined };
  } catch (error) {
    return { result: undefined, error };
  }
}

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

  it("date가 올바르지 않은 경우", async () => {
    const { error } = safeTry(() => parseTransaction({
      ...validTransaction,
      date: "2025-11-11 12:00:00",
    }));

    invariant(v.isValiError(error));
    expect(v.summarize(error.issues)).toMatchInlineSnapshot(`
      "× Invalid format: Expected /^\\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\\d|0[1-9]|3[01])$/u but received "2025-11-11 12:00:00"
        → at date"
    `);
  });
});
