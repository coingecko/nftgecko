import { Web3MutationName } from "./names";

/** @typedef {import("./state").default} Web3State */

/**
 * @type {import("vuex").MutationTree<Web3State>}
 */
const mutations = {
  // Mutations to set initialized
  [Web3MutationName.setInitialized](state, /** @type {boolean} */ initialized) {
    state.initialized = initialized;
  },
  // Mutations to set loading
  [Web3MutationName.setLoading](state, /** @type {boolean} */ loading) {
    state.loading = loading;
  },
  // Mutations to set status
  [Web3MutationName.setStatus](state, /** @type {String} */ status) {
    state.status = status;
  },
  // Mutations to set message
  [Web3MutationName.setMessage](state, /** @type {String} */ message) {
    state.message = message;
  }
};

export default mutations;
