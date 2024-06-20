import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import useAuthStore from "~/store/AuthStore";

const LOGIN = gql`
  mutation SignIn($signInInput: SigninInput!) {
    signIn(signInInput: $signInInput) {
      email
      id
      organizationId
      token
    }
  }
`;
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

export const useLogin = () => {
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [signIn, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: (res) => {
      console.log(res.signIn);
      ls.set("token", res.signIn.token);
      ls.set("_users", res.signIn);
      setToken(res.signIn.token);
      setUser(res.signIn);
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
