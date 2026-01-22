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
  return (
    // 프로바이더로 methods 내리기
      // form element에 onSubmit 붙이기
      <form>
        {props.children}
	  </form>
  );
}
