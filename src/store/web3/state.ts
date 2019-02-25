export interface Web3State {
  loading: boolean;
  status: "logout" | "login" | "loading";
  message: string;
  initialized: boolean;
  network: number | null;
  networkName: string;
}

export default {
  loading: true,
  status: "loading",
  message: "",
  initialized: false,
  network: null,
  networkName: ""
} as Web3State;
