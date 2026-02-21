import type { ComponentType } from "react";
import { SimpleForm } from "../SimpleForm";
import { Button } from "../../components/base/buttons/button";
import type { StandardSchemaV1 } from "@standard-schema/spec";

/** Passthrough schema for Storybook – accepts any form values without validation. */
function passthroughSchema<T extends Record<string, unknown>>(): StandardSchemaV1<T, T> {
  return {
    "~standard": {
      validate: (data: T) => ({ value: data }),
    },
  } as StandardSchemaV1<T, T>;
}

const DEFAULT_CLASS_NAME = "flex flex-col gap-4 max-w-md";

/** Storybook decorator factory. Use with `decorators: [formDecorator({ defaultValues: {...} })]`. */
export function formDecorator<T extends Record<string, unknown>>(options: {
  defaultValues: T;
  className?: string;
}) {
  const { defaultValues, className = DEFAULT_CLASS_NAME } = options;
  return function StorybookFormDecorator(Story: ComponentType) {
    return (
      <SimpleForm
        schema={passthroughSchema<T>()}
        defaultValues={defaultValues}
        onSubmit={async (v) => console.log(v)}
        className={className}
      >
        <Story />
        <Button type="submit">제출</Button>
      </SimpleForm>
    );
  };
}
