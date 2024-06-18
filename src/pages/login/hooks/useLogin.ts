import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import useAuthStore from "~/store/AuthStore";

const LOGIN = gql`
  mutation SignIn($signInInput: SigninInput!) {
    signIn(signInInput: $signInInput)
  }
`;
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

export const useLogin = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  const [signIn, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: (res) => {
      console.log(res.signIn);
      ls.set("token", res.signIn);
      setToken(res.signIn);
      navigate("/app/dashboard");
    },
    onError: (error) => console.log(error),
  });

  const login = (input) => {
    signIn({
      variables: { signInInput: input },
    });
  };
  return {
    login,
    data,
    loading,
    error,
  };
};
