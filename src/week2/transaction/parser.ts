import type { SimpleTransaction, ValidTransaction } from "./type";
import { ACCOUNT_LIST, COMMODITY_LIST } from "./type";
import * as v from "valibot";
import { Temporal } from "temporal-polyfill";
import invariant from "../invariant";
import { isBalanceZero } from "./domain";
import { parseStandardSchemaV1 } from "../standard-schema";

const postingSchema = v.object({
  account: v.picklist(ACCOUNT_LIST),
  amount: v.number(),
  commodity: v.picklist(COMMODITY_LIST),
});

export const validTransactionSchema = v.pipe(
  v.object({
    __brand: v.literal("ValidTransaction"),
    date: v.pipe(
      v.string(),
      v.regex(v.ISO_DATE_REGEX, "올바른 날짜 형식이 아닙니다"),
      v.transform((str) => Temporal.PlainDate.from(str)),
    ),
    description: v.string(),
    postings: v.pipe(v.array(postingSchema), v.minLength(2, "차변과 대변의 계정과목을 입력해주세요")),
    tags: v.array(v.string()),
  }),
  v.forward(
    v.check((transaction) => isBalanceZero(transaction), "차변과 대변의 합이 0이 아닙니다"),
    ["postings"]
  ),
);

export function parseTransaction(transaction: unknown): ValidTransaction {

  return parseStandardSchemaV1(validTransactionSchema, {
    ...transaction ?? {},
    __brand: "ValidTransaction",
  });
}
