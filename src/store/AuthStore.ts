import SecureLS from "secure-ls";
import { create } from "zustand";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

type State = {
  authUser: any;
  tokens: any;
  role: string;
  email: string;
};
type Action = {
  setUser: (authUser: State["authUser"]) => void;
  setToken: (tokens: State["tokens"]) => void;
  setEmail: (role: State["role"]) => void;
  setRole: (email: State["email"]) => void;
};

const getTokens = () => {
  let tokens = {};
  try {
    const item = ls.get("tokens");
    tokens = item ? JSON.parse(item) : {};
  } catch (err) {
    console.warn("Error reading storage key'_tokens'", err);
    tokens = {};
  }
  return tokens;
};

const getAuthUser = () => {
  let users = {};
  try {
    const item = ls.get("_users");
    users = item ? JSON.parse(item) : {};
  } catch (error) {
    // eslint-disable-next-line no-console
    users = {};
  }
  return users;
};
const getRole = () => {
  let role = "";
  try {
    const item = ls.get("role") ?? "";
    role = item;
  } catch (error) {
    role = "";
  }
  return role;
};

const useAuthStore = create<State & Action>((set) => ({
  authUser: getAuthUser(),
  tokens: getTokens(),
  role: getRole(),
  email: "",
  setUser: (authUser) => set(() => ({ authUser: authUser })),
  setToken: (tokens) => set(() => ({ tokens: tokens })),
  setEmail: (email) => set(() => ({ email: email })),
  setRole: (role) => set(() => ({ role: role })),
}));

export default useAuthStore;
