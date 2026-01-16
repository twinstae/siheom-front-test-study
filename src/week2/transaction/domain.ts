import type { AccountType, SimpleTransaction } from "./type";

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

export function getAccountType(account: string): AccountType {
  if (account.startsWith("자본")) {
    return "자본";
  } else if (account.startsWith("자산")) {
    return "자산";
  } else if (account.startsWith("부채")) {
    return "부채";
  } else if (account.startsWith("사업수익")) {
    return "사업수익";
  } else if (account.startsWith("사업비용")) {
    return "사업비용";
  }
  throw new Error(`Unknown account type: ${account}`);
}
