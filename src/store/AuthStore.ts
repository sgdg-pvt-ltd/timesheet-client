import SecureLS from "secure-ls";
import { create } from "zustand";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

type State = {
  authUser: any;
  token: any;
  role: string;
  email: string;
};
type Action = {
  setUser: (authUser: State["authUser"]) => void;
  setToken: (tokens: State["token"]) => void;
  setEmail: (role: State["role"]) => void;
  setRole: (email: State["email"]) => void;
};

const getToken = () => {
  let token = "";
  try {
    const item = ls.get("token");
    token = item ?? "";
  } catch (err) {
    console.warn("Error reading storage key'_tokens'", err);
    token = "";
  }
  return token;
};

const getAuthUser = () => {
  let users = {};
  try {
    const item = ls.get("_users");
    users = item ?? {};
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
  token: getToken(),
  role: getRole(),
  email: "",
  setUser: (authUser) => set(() => ({ authUser: authUser })),
  setToken: (token) => set(() => ({ token: token })),
  setEmail: (email) => set(() => ({ email: email })),
  setRole: (role) => set(() => ({ role: role })),
}));

export default useAuthStore;
