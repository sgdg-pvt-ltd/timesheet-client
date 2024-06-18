import { TokenRefreshLink } from "apollo-link-token-refresh";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { handleLogoutWithoutHook } from "./errorLink";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

export const refrestTokenQuery = `
      mutation RefreshToken($input: InputRefreshToken!) {
  refreshToken(input: $input) {
    message
    data {
      access
      refresh
    }
  }
}
    `;

const getTokens = () => {
  let tokens = "" || { access: "", refresh: "" };
  try {
    const item = ls.get("tokens");

    tokens = item ? JSON.parse(item) : "";
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Error reading localStorage key “tokens”:`, error);
    tokens.access = "";
  }
  return tokens;
};

const JwtRefreshLink = new TokenRefreshLink({
  accessTokenField: "access",
  isTokenValidOrUndefined: async () => {
    const tokens = getTokens();
    if (!tokens?.access) {
      return true;
    }
    try {
      const { exp } = jwtDecode<JwtPayload>(tokens?.access);
      if (exp && Date.now() > exp * 1000) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },
  fetchAccessToken: async () => {
    const tokens = getTokens() || {};
    const response = await fetch(``, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: refrestTokenQuery,
        variables: {
          input: {
            refreshToken: tokens.refresh,
          },
        },
      }),
    });
    return await response.json();
  },
  handleResponse: () => (res) => {
    const data = {
      access: res?.data?.refreshToken?.data?.access,
    };
    return { data };
  },
  handleFetch: (access: string) => {
    const tokens = getTokens();
    const updatedTokens = {
      ...tokens,
      access,
    };
    const stringiFiedToken = JSON.stringify(updatedTokens);
    ls.set("tokens", stringiFiedToken);
  },
  handleError: (err) => {
    console.error(err, "tokenrefresh");

    handleLogoutWithoutHook();
  },
});

export default JwtRefreshLink;
