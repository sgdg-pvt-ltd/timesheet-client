import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import useAuthStore from "~/store/AuthStore";

const SIGNUP = gql`
  mutation SignUp($signUpInput: SignupInput!) {
    signUp(signUpInput: $signUpInput) {
      id
      email
      role
    }
  }
`;

export const useSignup = () => {
  const navigate = useNavigate();
  const [signup, { data, loading, error }] = useMutation(SIGNUP, {
    onCompleted: (res) => {
      if (res.signUp.id) navigate("success");
    },
    onError: (error) => console.log(error),
  });

  const signUp = (input) => {
    signup({
      variables: { signUpInput: input },
    });
  };
  return {
    signUp,
    data,
    loading,
    error,
  };
};
