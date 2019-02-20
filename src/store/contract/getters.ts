import { ContractGetterName } from "./names";
import { GetterTree } from "vuex";
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
    return state.contractsData.map(c => c.contract.contract_address);
  },
  // get contract ContractDetails
  [ContractGetterName.getContractDetails](state) {
    return Object.keys(state.contractDetails).map(key => {
      return state.contractDetails[key];
    });
  },
  [ContractGetterName.getNFTImages](state) {
    return state.contractDetails[state.name].ids;
  }
};

export default getters;
