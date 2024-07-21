import { Button, Paper, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#344C9E] h-screen w-full flex justify-center items-center">
      <Paper
        shadow="xs"
        p="xl"
        className="items-center min-h-fit flex flex-col gap-8 justify-between rounded-lg w-fit bg-slate-100 p-20"
      >
        <Text>
          Your account has been created successfully. Please login to continue.
        </Text>
        <Button
          // fullWidth
          variant="filled"
          size="lg"
          radius="md"
          color="#344C9E"
          w={200}
          onClick={() => navigate("/")}
        >
          Proceed to login
        </Button>
      </Paper>
    </div>
  );
};

export default SignupSuccess;
