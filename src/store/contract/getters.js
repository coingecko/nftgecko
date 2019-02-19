import { ContractGetterName } from "./names";

/** @typedef {import("./state").default} ContractState */
/** @typedef {ContractState["contractDetails"]} ContractDetails */

/** @type {*} */
const getters = {
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
  [ContractGetterName.getNFTImages](state, /** @type {string} */ name) {
    return state.contractDetails[name].ids;
  }
};

export default getters;
