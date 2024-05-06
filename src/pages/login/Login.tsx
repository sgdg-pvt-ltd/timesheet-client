import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { z } from "zod";
import { ControlledField, useRHForm } from "~/components/form";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const {
    Form,
    methods: {
      control,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {},
    schema: z.object({
      email: z
        .string({ required_error: "Email is required." })
        .refine((dtx) => dtx.trim()?.length > 0, "Email is required"),
      password: z.string({ required_error: "Password is required." }),
      rememberMe: z.boolean().default(false),
    }),
  });

  const handleSubmit = async (data) => {
    const { email, password, rememberMe } = data;
    const payload = {
      email: email.trim(),
      password: password,
      rememberMe,
    };
    console.log(payload);
  };
  return (
    <div className="bg-gray-200 h-screen w-full flex justify-center items-center">
      <Paper shadow="xs" p="xl" className="min-w-[20%] min-h-fit">
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Title order={2}>Welcome</Title>
          <Text>Please Login to continue</Text>
          <ControlledField
            name="email"
            required={true}
            control={control}
            errors={errors}
            Component={TextInput}
            componentProps={{
              label: "Email/ Username",
              placeholder: "youremail@example.com",
            }}
          />
          <ControlledField
            name="password"
            required={true}
            control={control}
            errors={errors}
            Component={PasswordInput}
            componentProps={{
              label: "Password",
              placeholder: "********",
            }}
          />
          <div className="flex justify-between">
            <ControlledField
              name="rememberMe"
              required={true}
              control={control}
              errors={errors}
              Component={Checkbox}
              componentProps={{
                label: "Remember Me",
              }}
            />
            <Anchor href="forgot-password">Forgot Password?</Anchor>
          </div>
          <Button fullWidth variant="filled" type="submit">
            Login
          </Button>
        </Form>
      </Paper>
    </div>
  );
};
