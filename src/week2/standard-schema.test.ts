import { describe, it, expect } from "vitest";
import { parseAsyncStandardSchemaV1, StandardSchemaV1Error, getPath } from "./standard-schema";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import * as v from "valibot";

describe("parseAsyncStandardSchemaV1", () => {
  it("검증이 성공하면 값을 반환", async () => {
    const schema: StandardSchemaV1<string, string> = v.pipe(v.literal("input"), v.transform((_str) => "test"));

    const result = await parseAsyncStandardSchemaV1(schema, "input");
    expect(result).toBe("test");
  });

  it("검증이 실패하면 StandardSchemaV1Error를 던짐", async () => {
    const schema: StandardSchemaV1<string, string> = v.literal("test");

    await expect(parseAsyncStandardSchemaV1(schema, "input")).rejects.toThrow(StandardSchemaV1Error);
    await expect(parseAsyncStandardSchemaV1(schema, "input")).rejects.toThrow("Validation failed");
  });
});

describe("getPath", () => {
  it("path가 undefined일 때 <root>를 반환", () => {
    expect(getPath(undefined)).toBe("<root>");
  });

  it("path가 빈 배열일 때 빈 문자열을 반환", () => {
    expect(getPath([])).toBe("");
  });

  it("path가 문자열 세그먼트만 있을 때 점으로 연결된 문자열을 반환", () => {
    expect(getPath(["field1", "field2", "field3"])).toBe("field1.field2.field3");
  });

  it("path가 숫자 세그먼트만 있을 때 점으로 연결된 문자열을 반환", () => {
    expect(getPath([0, 1, 2])).toBe("0.1.2");
  });

  it("path가 객체 세그먼트(key 속성 있음)만 있을 때 key를 점으로 연결한 문자열을 반환", () => {
    expect(getPath([{ key: "field1" }, { key: "field2" }])).toBe("field1.field2");
  });

  it("path가 객체 세그먼트의 key가 숫자일 때 문자열로 변환하여 반환", () => {
    expect(getPath([{ key: 0 }, { key: 1 }])).toBe("0.1");
  });

  it("path가 문자열과 객체 세그먼트가 섞여 있을 때 올바르게 처리", () => {
    expect(getPath(["field1", { key: "field2" }, "field3"])).toBe("field1.field2.field3");
  });

  it("path가 숫자와 객체 세그먼트가 섞여 있을 때 올바르게 처리", () => {
    expect(getPath([0, { key: "field" }, 1])).toBe("0.field.1");
  });

  it("path가 단일 문자열 세그먼트일 때 그대로 반환", () => {
    expect(getPath(["field"])).toBe("field");
  });

  it("path가 단일 숫자 세그먼트일 때 문자열로 변환하여 반환", () => {
    expect(getPath([0])).toBe("0");
  });

  it("path가 단일 객체 세그먼트일 때 key를 반환", () => {
    expect(getPath([{ key: "field" }])).toBe("field");
  });

  it("path가 객체이지만 key 속성이 없을 때 String(segment)로 변환", () => {
    expect(getPath([{ other: "value" } as any])).toBe("[object Object]");
  });

  it("path가 null 세그먼트를 포함할 때 올바르게 처리", () => {
    expect(getPath(["field1", null as any, "field2"])).toBe("field1.null.field2");
  });

  it("path가 boolean 세그먼트를 포함할 때 올바르게 처리", () => {
    expect(getPath(["field1", true as any, "field2"])).toBe("field1.true.field2");
  });
});
