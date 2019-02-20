export interface Web3State {
  loading: boolean;
  status: "logout" | "login" | "loading";
  message: string,
  initialized: boolean;
}

export default {
  loading: true,
  status: "loading",
  message: "",
  initialized: false
} as Web3State;
