import { Controller } from "react-hook-form";
import { ErrorLabel } from "../atomic";

interface TControlledField {
  id?: string;
  className?: string;
  name: string;
  label?: string;
  control: any;
  errors?: any;
  required?: boolean;
  rules?: any;
  Component: any;
  componentProps?: any;
}

export default function ControlledField({
  id,
  className = "",
  name,
  control,
  errors,
  rules,
  required,
  Component,
  componentProps,
}: TControlledField) {
  const hasError = !!errors?.[name];
  const errorMsg = hasError ? errors[name].message : "";
  return (
    <div
      className={`leading-none ${className}`}
      data-test-id={`${name}-controlled-wrapper`}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Component
              id={id}
              data-test-id={`${name}-test-field`}
              error={hasError && errorMsg}
              {...field}
              {...componentProps}
              withAsterisk={required}
            />
          );
        }}
      />
    </div>
  );
}
