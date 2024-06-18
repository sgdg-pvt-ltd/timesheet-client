import { ApolloLink } from "@apollo/client";
import SecureLS from "secure-ls";

// import { authTokenNeeded, refreshTokenNeeded, tokenNotNeeded } from './constants';

const ls = new SecureLS({ encodingType: "aes", isCompression: false });
export type Headers = {
  authorization?: string;
  lang?: string;
};
export const getAccessToken = () => {
  let token = "";
  try {
    const item = ls.get("token");
    token = item ?? "";
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Error reading localStorage key “tokens”:`, error);
    token = "";
  }
  return token;
};

export const client = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token: string = getAccessToken() ?? "";
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  }));
  return forward(operation);
});
const authLink = client;
export default authLink;
