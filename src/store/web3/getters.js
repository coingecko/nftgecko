import { Web3GetterName } from "./names";

/** @typedef {import("./state").default} Web3State */

/**
 * @type {*}
 */
const getters = {
  // get loading status
  [Web3GetterName.web3Loading](state) {
    return state.loading;
  },
  [Web3GetterName.web3Initialize](state) {
    return state.initialized;
  },
  // get loading message
  [Web3GetterName.web3LoadingMessage](state) {
    return state.message;
  },
  // get user status
  [Web3GetterName.web3Status](state) {
    return state.status;
  }
};

export default getters;
