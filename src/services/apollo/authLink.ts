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
    const item = ls.get("tokens");

    const tokens = item ? JSON.parse(item) : "";
    token = tokens?.access;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Error reading localStorage key “tokens”:`, error);
    token = "";
  }
  return token;
};

export const getSecret = () => {
  let secret = "";
  try {
    const item = ls.get("secretId");

    secret = item ?? "";
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Error reading localStorage key _wks:`, error);
    secret = "";
  }
  return secret;
};

export const client = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const tokens: string = getAccessToken() ?? "";

  const secretId = getSecret() ?? "";
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      ...(tokens && { authorization: `Bearer ${tokens}` }),
      ...(secretId && { "x-workspace-secret-id": `${secretId}` }),
    },
  }));
  return forward(operation);
});
const authLink = client;
export default authLink;
