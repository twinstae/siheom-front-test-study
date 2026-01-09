import { describe, it, expect } from "bun:test";
import { isBalanceZero } from "./domain";
import { notBalancedTransaction, validTransaction } from "./fixtures";

describe("isBalanceZero", () => {
  it("balance가 0이 맞는 경우", async () => {
    expect(isBalanceZero(validTransaction)).toBe(true);
  });

  it("balance가 0이 안 맞는 경우", async () => {
    expect(isBalanceZero(notBalancedTransaction)).toBe(false);
  });
});
