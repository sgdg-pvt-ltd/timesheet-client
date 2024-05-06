import { z } from "zod";
import { ReactNode, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

interface TMethodsProps {
  initialValues?: any;
  schema: any;
  mode?: any;
}
interface TFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  formId?: string;
  className?: string;
}

export default function useRHForm({
  initialValues,
  schema,
  mode,
}: TMethodsProps) {
  type ValidationSchema = z.infer<typeof schema>;

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: mode ?? "all",
    defaultValues: initialValues,
  });
  const Form = useMemo(() => {
    const FormComponent = ({
      formId,
      children,
      onSubmit,
      className,
    }: TFormProps) => (
      <FormProvider {...methods}>
        <form
          id={formId}
          onSubmit={methods.handleSubmit(onSubmit)}
          className={className}
        >
          {children}
        </form>
      </FormProvider>
    );
    return FormComponent;
  }, [methods]);

  return {
    methods,
    Form,
  };
}
