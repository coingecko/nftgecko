import { GetterTree } from "vuex";
import { ContractGetterName } from "./names";
import { ContractState } from "./state";

const getters: GetterTree<ContractState, any> = {
  // get loading status
  [ContractGetterName.getLoading](state) {
    return state.loading;
  },
  // get current eth address
  [ContractGetterName.getCurrentAddress](state) {
    return state.address;
  },
  // get all the contract addresses
  [ContractGetterName.getContractAdresses](state) {
    return (network: string) => state.contractsData[network].map((c) => c.contract.contract_address);
  },
  // get contract ContractDetails
  [ContractGetterName.getContractDetails](state) {
    return (network: string) => Object.keys(state.contractDetails[network]).map((key) =>
       state.contractDetails[network][key],
    );
  },
  [ContractGetterName.getNFTImages](state) {
    return (network: string) => state.contractDetails[network][state.name].ids;
  },
  [ContractGetterName.getCompKey](state) {
    return state.compKey;
  },
};

export default getters;
