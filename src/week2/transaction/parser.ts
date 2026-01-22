import type { SimpleTransaction, ValidTransaction } from "./type";
import { ACCOUNT_LIST, COMMODITY_LIST } from "./type";
import * as v from "valibot";
import { Temporal } from "temporal-polyfill";
import { isBalanceZero } from "./domain";
import { parseStandardSchemaV1 } from "../standard-schema";

const postingSchema = v.object({
  account: v.picklist(ACCOUNT_LIST, "올바른 계정과목이 아닙니다"),
  amount: v.number("금액을 입력해주세요"),
  commodity: v.picklist(COMMODITY_LIST, "올바른 통화가 아닙니다"),
});

export const validTransactionSchema = v.pipe(
  v.object({
    __brand: v.literal("ValidTransaction"),
    date: v.pipe(
      v.string("날짜를 입력해주세요"),
      v.regex(v.ISO_DATE_REGEX, "올바른 날짜 형식이 아닙니다"),
      v.transform((str) => Temporal.PlainDate.from(str)),
    ),
    description: v.pipe(
      v.string(),
      v.minLength(1, "설명을 입력해주세요"),
      v.maxLength(100, "설명은 100자 이하로 입력해주세요"),
    ),
    postings: v.pipe(
      v.array(postingSchema),
      v.minLength(2, "차변과 대변의 계정과목을 입력해주세요"),
    ),
    tags: v.array(v.string()),
  }),
  v.forward(
    v.check((transaction) => isBalanceZero(transaction), "차변과 대변의 합이 0이 아닙니다"),
    ["postings"],
  ),
);

export function parseTransaction(transaction: SimpleTransaction): ValidTransaction {
  return parseStandardSchemaV1(validTransactionSchema, {
    ...transaction,
    __brand: "ValidTransaction",
  });
}
