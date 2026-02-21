import { useForm, FormProvider, type FieldValues } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { StandardSchemaV1 } from "@standard-schema/spec";

interface SimpleFormProps<Input, Output> extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  schema: StandardSchemaV1<Input, Output>;
  defaultValues: FieldValues;
  onSubmit: (values: Output) => Promise<void>;
}

export function SimpleForm<Output>({
  schema,
  onSubmit,
  defaultValues,
  ...props
}: SimpleFormProps<FieldValues, Output>) {
  const methods = useForm({ defaultValues, resolver: standardSchemaResolver(schema) });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {props.children}
      </form>
    </FormProvider>
  );
}
