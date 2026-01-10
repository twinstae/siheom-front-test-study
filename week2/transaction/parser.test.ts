import { describe, it, expect } from "bun:test";
import { notBalancedTransaction, validTransaction } from "./fixtures";
import { parseTransaction, validTransactionSchema } from "./parser";
import { Temporal } from "temporal-polyfill";
import { parseStandardSchemaV1, StandardSchemaV1Error, summarizeStandardSchemaV1Issues } from "../standard-schema";
import { Valimock } from "valimock";

function safeTry<T>(
  fn: () => T,
): { result: T; error: undefined } | { result: undefined; error: unknown } {
  try {
    return { result: fn(), error: undefined };
  } catch (error) {
    return { result: undefined, error };
  }
}

describe("parseTransaction", () => {
  it("balance가 0이 맞는 경우", () => {
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

  it("balance가 0이 안 맞는 경우", () => {
    expect(() => parseTransaction(notBalancedTransaction)).toThrow("Transaction is not balanced");
  });

  it("mock data 생성", () => {
    const result = new Valimock().mock(validTransactionSchema);
    expect(parseStandardSchemaV1(validTransactionSchema, result)).toStrictEqual({
      ...result,
      date: Temporal.PlainDate.from(result.date),
    });
  });

  it("date가 올바르지 않은 경우", () => {
    assertStandardSchemaV1Error(
      () =>
        parseTransaction({
          ...validTransaction,
          date: "2025-11-11 12:00:00",
        }),
      {
        date: "올바른 날짜 형식이 아닙니다",
      },
    );
  });
});

function assertStandardSchemaV1Error(run: () => unknown, expected: any): void {
  const { error } = safeTry(run);

  if (error instanceof StandardSchemaV1Error === false) {
    throw new Error("StandardSchemaV1Error가 발생하지 않았습니다 : " + error);
  }
  expect(summarizeStandardSchemaV1Issues(error.issues)).toStrictEqual(expected);
}
