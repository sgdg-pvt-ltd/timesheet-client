import { onError } from "@apollo/client/link/error";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

// const operationsToSkipLog = [
//   "login",
//   "register",
//   "changePassword",
//   "forgotPassword",
//   "resetPassword",
//   "signup",
// ];
export const handleLogoutWithoutHook = () => {
  // Logout without hook

  ls.clear();
  sessionStorage.clear();

  // do other stuff required when logout
  // eslint-disable-next-line no-restricted-globals
  location.reload();
  // location.reload() after token removed affects user redirect
};

export default function useErrorLink() {
  const errorLink = onError(({ graphQLErrors, operation }) => {
    if (graphQLErrors) {
      const isDashboardQuery =
        operation?.operationName === "getDashboardData" ||
        operation?.operationName === "getAttributes";

      if (isDashboardQuery) return;
      console.error("graphqlErrors", JSON.stringify(graphQLErrors));
      // const skipLog = operationsToSkipLog.includes(operation?.operationName);
      // const errorPayload = {
      //   graphQLError: graphQLErrors,
      //   operationName: operation?.operationName,
      //   variables: skipLog ? {} : operation?.variables,
      // };
      if (
        graphQLErrors?.length > 0 &&
        graphQLErrors[0]?.extensions?.code === "Expired"
      ) {
        handleLogoutWithoutHook();
      } else if (
        graphQLErrors?.length > 0 &&
        graphQLErrors[0]?.message === "Auth Failed"
      ) {
        console.error("Auth Failed");

        setTimeout(() => {
          handleLogoutWithoutHook();
        }, 1000);
      }
    }

    return;
  });

  return {
    errorLink,
  };
}
