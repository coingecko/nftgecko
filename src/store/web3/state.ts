export interface Web3State {
  loading: boolean;
  status: "logout" | "login" | "loading";
  message: string;
  initialized: boolean;
  network: string;
}

export default {
  loading: true,
  status: "loading",
  message: "",
  initialized: false,
  network: ""
} as Web3State;
