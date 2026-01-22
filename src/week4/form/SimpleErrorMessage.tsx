import { Controller, useFormContext } from "react-hook-form";

export function getErrorId(name: string) {
  return `error-${name}`;
}

export function SimpleErrorMessage({ name }: { name: string }) {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ fieldState }) => (
        <>
          {fieldState.error && (
            <p
              id={getErrorId(name)}
              className="text-sm text-error-primary group-invalid:text-error-primary"
              role="alert"
              aria-label={fieldState.error?.root?.message ?? fieldState.error?.message}
            >
              {fieldState.error?.root?.message ?? fieldState.error?.message}
            </p>
          )}
        </>
      )}
      control={control}
      name={name}
    />
  );
}
