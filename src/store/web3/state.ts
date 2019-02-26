export interface Web3State {
  loading: boolean;
  status: "logout" | "login" | "loading";
  message: string;
  initialized: boolean;
  network: number | null;
  networkName: string;
}

const state: Web3State = {
  loading: true,
  status: "loading",
  message: "",
  initialized: false,
  network: null,
  networkName: ""
};

export default state;
