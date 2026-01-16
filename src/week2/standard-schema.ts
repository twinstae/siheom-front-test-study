import invariant from "./invariant";

/** The Standard Schema interface. */
export interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
}

export declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  export interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1;
    /** The vendor name of the schema library. */
    readonly vendor: string;
    /** Validates unknown input values. */
    readonly validate: (
      value: unknown,
      options?: StandardSchemaV1.Options | undefined,
    ) => Result<Output> | Promise<Result<Output>>;
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined;
  }

  /** The result interface of the validate function. */
  export type Result<Output> = SuccessResult<Output> | FailureResult;

  /** The result interface if validation succeeds. */
  export interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output;
    /** A falsy value for `issues` indicates success. */
    readonly issues?: undefined;
  }

  export interface Options {
    /** Explicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }

  /** The result interface if validation fails. */
  export interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>;
  }

  /** The issue interface of the failure output. */
  export interface Issue {
    /** The error message of the issue. */
    readonly message: string;
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }

  /** The path segment interface of the issue. */
  export interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey;
  }

  /** The Standard Schema types interface. */
  export interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input;
    /** The output type of the schema. */
    readonly output: Output;
  }

  /** Infers the input type of a Standard Schema. */
  export type InferInput<Schema extends StandardSchemaV1> = NonNullable<
    Schema["~standard"]["types"]
  >["input"];

  /** Infers the output type of a Standard Schema. */
  export type InferOutput<Schema extends StandardSchemaV1> = NonNullable<
    Schema["~standard"]["types"]
  >["output"];
}

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
