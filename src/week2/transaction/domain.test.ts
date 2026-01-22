import { describe, it, expect } from "vitest";
import { isBalanceZero, getAccountType } from "./domain";
import { notBalancedSimpleTransaction, validSimpleTransaction } from "./fixtures";

describe("isBalanceZero", () => {
  it("balance가 0이 맞는 경우", async () => {
    expect(isBalanceZero(validSimpleTransaction)).toBe(true);
  });

  it("balance가 0이 안 맞는 경우", async () => {
    expect(isBalanceZero(notBalancedSimpleTransaction)).toBe(false);
  });
});

describe("getAccountType", () => {
  it("자본으로 시작하는 계정은 자본을 반환", () => {
    expect(getAccountType("자본:출자금")).toBe("자본");
  });

  it("자산으로 시작하는 계정은 자산을 반환", () => {
    expect(getAccountType("자산:현금")).toBe("자산");
  });

  it("부채로 시작하는 계정은 부채를 반환", () => {
    expect(getAccountType("부채:유동부채:단기차입금")).toBe("부채");
  });

  it("사업수익으로 시작하는 계정은 사업수익을 반환", () => {
    expect(getAccountType("사업수익:고유목적사업수익:기부금수익")).toBe("사업수익");
  });

  it("사업비용으로 시작하는 계정은 사업비용을 반환", () => {
    expect(getAccountType("사업비용:사업수행비용:인력비용:급여")).toBe("사업비용");
  });

  it("알 수 없는 계정 타입은 에러를 던짐", () => {
    expect(() => getAccountType("알수없는계정")).toThrow("Unknown account type: 알수없는계정");
  });
});
