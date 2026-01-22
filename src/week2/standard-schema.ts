import type { StandardSchemaV1 } from "@standard-schema/spec";
import invariant from "./invariant";

export class StandardSchemaV1Error extends Error {
  /** The issues of the validation error. */
  public readonly issues: ReadonlyArray<StandardSchemaV1.Issue>;

  constructor(message: string, issues: ReadonlyArray<StandardSchemaV1.Issue>) {
    super(message);
    this.issues = issues;
    Object.setPrototypeOf(this, StandardSchemaV1Error.prototype);
  }
}

export function parseStandardSchemaV1<Input, Output>(
  schema: StandardSchemaV1<Input, Output>,
  data: unknown,
): Output {
  const result = schema["~standard"].validate(data);

  invariant(
    !(result instanceof Promise),
    "Asynchronous validation is not supported, use parseAsyncStandardSchemaV1 instead.",
  );

  if (result.issues) {
    throw new StandardSchemaV1Error("Validation failed", result.issues);
  }

  return result.value;
}

export async function parseAsyncStandardSchemaV1<Input, Output>(
  schema: StandardSchemaV1<Input, Output>,
  data: unknown,
): Promise<Output> {
  const result = await schema["~standard"].validate(data);
  if (result.issues) {
    throw new StandardSchemaV1Error("Validation failed", result.issues);
  }
  return result.value;
}

export function summarizeStandardSchemaV1Issues(
  issues: ReadonlyArray<StandardSchemaV1.Issue>,
  // output value as string
): Record<string, string> {
  return Object.fromEntries(
    issues.map((issue) => {
      const path =
        issue.path
          ?.map((segment) =>
            typeof segment === "object" && "key" in segment
              ? `${String(segment.key)}`
              : String(segment),
          )
          .join(".") ?? "<root>";
      return [path, issue.message];
    }),
  );
}
