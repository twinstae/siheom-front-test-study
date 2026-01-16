import { describe, it, expect } from "vitest";
import { isBalanceZero } from "./domain";
import { notBalancedSimpleTransaction, validSimpleTransaction } from "./fixtures";

describe("isBalanceZero", () => {
  it("balance가 0이 맞는 경우", async () => {
    expect(isBalanceZero(validSimpleTransaction)).toBe(true);
  });

  it("balance가 0이 안 맞는 경우", async () => {
    expect(isBalanceZero(notBalancedSimpleTransaction)).toBe(false);
  });
});
