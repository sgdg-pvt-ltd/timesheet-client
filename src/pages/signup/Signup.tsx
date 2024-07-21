import {
  Button,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ControlledField, useRHForm } from "~/components/form";
import signupImg from "~/assets/images/login1.png";
import { useSignup } from "./hooks/useSignup";

export const Signup = () => {
  const {
    Form,
    methods: {
      control,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {},
    schema: z
      .object({
        email: z
          .string({ required_error: "Email is required." })
          .email("Invalid email")
          .refine((dtx) => dtx.trim()?.length > 0, "Email is required"),
        password: z.string({ required_error: "Password is required." }),
        confirmPassword: z.string({ required_error: "Password is required." }),
      })
      .refine((dtx) => dtx.password === dtx.confirmPassword, {
        message: "Passowrd does not match",
        path: ["confirmpassword"],
      }),
  });
  const { signUp, loading } = useSignup();

  const handleSubmit = async (data) => {
    signUp({ ...data });
  };
  return (
    <div className="bg-[#344C9E] h-screen w-full flex justify-center items-center">
      <Paper
        shadow="xs"
        p="xl"
        className="items-center min-h-fit flex justify-between rounded-lg w-[60%] bg-slate-100 p-20"
      >
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col w-2/5 gap-4 p-10 "
          formId="signup-form"
        >
          <Title order={1}>Signup</Title>
          <Text>Let's get started</Text>
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
          <ControlledField
            name="confirmPassword"
            required={true}
            control={control}
            errors={errors}
            Component={PasswordInput}
            componentProps={{
              label: "Confirm Password",
              placeholder: "********",
              size: "md",
            }}
            className="w-full"
          />

          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <Button
              // fullWidth
              variant="filled"
              type="submit"
              size="lg"
              radius="md"
              color="#344C9E"
              form="signup-form"
              w={200}
              loading={loading}
              disabled={loading}
            >
              Signup
            </Button>
            <Link to={"/auth/login"} replace={true}>
              <Text c={"blue"}>Already have an account? Login</Text>
            </Link>
          </div>
        </Form>
        <Image src={signupImg} alt="Login" w="60%" h="auto" className="p-10" />
      </Paper>
    </div>
  );
};
