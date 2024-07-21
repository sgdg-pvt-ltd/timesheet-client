import {
  Anchor,
  Button,
  Checkbox,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { z } from "zod";
import { ControlledField, useRHForm } from "~/components/form";
import loginImg from "~/assets/images/login2.png";
import { useLogin } from "./hooks/useLogin";
import { Link } from "react-router-dom";
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const { login, loading } = useLogin();
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
        .email("Invalid email")
        .refine((dtx) => dtx.trim()?.length > 0, "Email is required"),
      password: z
        .string({ required_error: "Password is required." })
        .min(1, "Password is required"),
      rememberMe: z.boolean().default(false),
    }),
  });
  console.log(errors);

  const handleSubmit = async (data) => {
    const { email, password, rememberMe } = data;
    const payload = {
      email: email.trim(),
      password: password,
      // rememberMe,
    };
    login(payload);
  };
  return (
    <div className="bg-[#344C9E] h-screen w-full flex justify-center items-center">
      <Paper
        shadow="xs"
        p="xl"
        className="items-center min-h-fit flex justify-between rounded-lg w-[60%] bg-slate-100 p-20"
      >
        <Image src={loginImg} alt="Login" w="60%" h="auto" className="p-10" />
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col w-2/5 gap-4 p-10 "
          formId="login-form"
        >
          <Title order={1}>Welcome</Title>
          <Text>Please Login to continue</Text>
          <ControlledField
            name="email"
            required={true}
            control={control}
            errors={errors}
            Component={TextInput}
            componentProps={{
              label: "Email",
              placeholder: "youremail@example.com",
              size: "md",
            }}
            className="w-full"
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
              size: "md",
            }}
            className="w-full"
          />
          <div className="flex justify-between w-full">
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
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <Button
              // fullWidth
              variant="filled"
              type="submit"
              size="lg"
              radius="md"
              color="#344C9E"
              form="login-form"
              w={200}
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
            <Link to={"/auth/signup"} replace={true}>
              <Text c={"blue"}>Create new account</Text>
            </Link>
          </div>
        </Form>
      </Paper>
    </div>
  );
};
