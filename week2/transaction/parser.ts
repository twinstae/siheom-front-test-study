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

export const validTransactionSchema = v.object({
  __brand: v.literal("ValidTransaction"),
  date: v.pipe(
    v.string(),
    v.regex(v.ISO_DATE_REGEX, "올바른 날짜 형식이 아닙니다"),
    v.transform((str) => Temporal.PlainDate.from(str)),
  ),
  description: v.string(),
  postings: v.array(postingSchema),
  tags: v.array(v.string()),
});

export function parseTransaction(transaction: SimpleTransaction): ValidTransaction {
  invariant(isBalanceZero(transaction), "Transaction is not balanced");

  return parseStandardSchemaV1(validTransactionSchema, {
    ...transaction,
    __brand: "ValidTransaction",
  });
}

export function poorParseTransaction(transaction: SimpleTransaction): ValidTransaction {
  // very verbose manual validation without schemas or invariant
  if (transaction == null || typeof transaction !== "object") {
    throw new Error("transaction must be an object");
  }

  // date
  if (typeof transaction.date !== "string" || !v.ISO_DATE_REGEX.test(transaction.date)) {
    throw new Error("date must be a string in ISO format");
  }

  const date = Temporal.PlainDate.from(transaction.date);

  // description
  if (typeof transaction.description !== "string") {
    throw new Error("description must be a string");
  }

  // postings
  if (!Array.isArray(transaction.postings)) {
    throw new Error("postings must be an array");
  }
  if (transaction.postings.length === 0) {
    throw new Error("postings must have at least one entry");
  }

  const postings = [] as {
    account: any;
    amount: number;
    commodity: any;
  }[];

  for (let i = 0; i < transaction.postings.length; i++) {
    const p = (transaction.postings as any)[i];
    if (p == null || typeof p !== "object") {
      throw new Error(`posting[${i}] must be an object`);
    }
    if (typeof p.account !== "string") {
      throw new Error(`posting[${i}].account must be a string`);
    }
    if (!ACCOUNT_LIST.includes(p.account as any)) {
      throw new Error(`posting[${i}].account is unknown: ${p.account}`);
    }
    if (typeof p.amount !== "number" || !Number.isFinite(p.amount)) {
      throw new Error(`posting[${i}].amount must be a finite number`);
    }
    if (typeof p.commodity !== "string") {
      throw new Error(`posting[${i}].commodity must be a string`);
    }
    if (!COMMODITY_LIST.includes(p.commodity as any)) {
      throw new Error(`posting[${i}].commodity is unknown: ${p.commodity}`);
    }

    postings.push({ account: p.account, amount: p.amount, commodity: p.commodity });
  }

  // tags
  if (!Array.isArray(transaction.tags)) {
    throw new Error("tags must be an array");
  }
  for (let i = 0; i < transaction.tags.length; i++) {
    if (typeof (transaction.tags as any)[i] !== "string") {
      throw new Error(`tags[${i}] must be a string`);
    }
  }

  // balance check
  let sum = 0;
  for (const p of postings) sum += p.amount;
  if (sum !== 0) {
    throw new Error(`transaction is not balanced (sum=${sum})`);
  }

  // construct ValidTransaction
  return {
    __brand: "ValidTransaction",
    date,
    description: transaction.description,
    postings: postings.map((p) => ({
      account: p.account,
      amount: p.amount,
      commodity: p.commodity,
    })),
    tags: transaction.tags.slice(),
  };
}
