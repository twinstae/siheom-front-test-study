import type { SimpleTransaction, ValidTransaction } from "./type";
import { ACCOUNT_LIST, COMMODITY_LIST } from "./type";
import * as v from "valibot";
import { Temporal } from "temporal-polyfill";
import invariant from "../invariant";
import { isBalanceZero } from "./domain";

const postingSchema = v.object({
  account: v.picklist(ACCOUNT_LIST),
  amount: v.number(),
  commodity: v.picklist(COMMODITY_LIST),
});

const validTransactionSchema = v.object({
  date: v.pipe(
    v.string(),
    v.regex(v.ISO_DATE_REGEX),
    v.transform((str) => Temporal.PlainDate.from(str)),
  ),
  description: v.string(),
  postings: v.array(postingSchema),
  tags: v.array(v.string()),
});

export function parseTransaction(transaction: SimpleTransaction): ValidTransaction {
  invariant(isBalanceZero(transaction), "Transaction is not balanced");

  return v.parse(validTransactionSchema, transaction) as ValidTransaction;
}
