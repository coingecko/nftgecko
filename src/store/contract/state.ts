import { ContractJson } from "src/types/contractJson";

export interface ContractState {
  compKey: number;
  address: string;
  loading: boolean;
  contractsData: ContractJson[];
  names: string[];
  contractDetails: {
    [contract: string]: {
      address: string;
      name: string;
      abi: string;
      balance: number;
      ids: Array<{ id: number; image: string }>;
      thumb: string;
      symbol: string;
    };
  };
  name: string;
}

export default {
  compKey: 0,
  address: "",
  loading: true,
  contractsData: [],
  names: [],
  contractDetails: {},
  name: "",
  symbol: ""
} as ContractState;
