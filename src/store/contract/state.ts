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
        ids: { id: number; image: string }[];
        thumb: string;
      };
    };
  };
  name: string;
}

const state: ContractState = {
  compKey: 0,
  address: "",
  loading: true,
  contractsData: {},
  names: [],
  contractDetails: {},
  name: ""
};

export default state;
