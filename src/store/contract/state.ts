import { ContractJson } from "src/types/contractJson";

export interface ContractState {
  compKey: number;
  address: string;
  loading: boolean;
  contractsData: { [network: string]: ContractJson[] };
  names: string[];
  contractDetails: {
    [network: string]: {
      [contract: string]: {
        address: string;
        name: string;
        abi: string;
        balance: number;
        ids: Array<{ id: number; image: string }>;
        thumb: string;
      };
    };
  };
  name: string;
}

export default {
  compKey: 0,
  address: "",
  loading: true,
  contractsData: {},
  names: [],
  contractDetails: {},
  name: "",
} as ContractState;
