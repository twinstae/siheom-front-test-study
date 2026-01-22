import { describe, it, expect } from "vitest";
import invariant from "./invariant";

describe("invariant", () => {
  it("조건이 true이면 아무것도 하지 않음", () => {
    expect(() => invariant(true)).not.toThrow();
  });

  it("조건이 false이고 메시지가 없으면 기본 메시지로 에러를 던짐", () => {
    expect(() => invariant(false)).toThrow("Invariant failed");
  });

  it("조건이 false이고 문자열 메시지가 있으면 메시지를 포함한 에러를 던짐", () => {
    expect(() => invariant(false, "Custom message")).toThrow("Invariant failed: Custom message");
  });

  it("조건이 false이고 함수 메시지가 있으면 함수 결과를 포함한 에러를 던짐", () => {
    expect(() => invariant(false, () => "Function message")).toThrow(
      "Invariant failed: Function message",
    );
  });
});
