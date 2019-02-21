export interface Web3State {
  loading: boolean;
  status: "logout" | "login" | "loading";
  message: string;
  initialized: boolean;
  network: number | null;
}

export default {
  loading: true,
  status: "loading",
  message: "",
  initialized: false,
  network: null
} as Web3State;
