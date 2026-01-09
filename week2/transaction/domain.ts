import type { SimpleTransaction } from "./type";

function sum(arr: Iterable<number>): number {
  let total = 0;
  for (const num of arr) {
    total += num;
  }
  return total;
}

export function isBalanceZero(transaction: SimpleTransaction): boolean {
  return sum(transaction.postings.map((p) => p.amount)) === 0;
}
