import { SUPPORTED_NETWORK } from "src/contracts/contract";
import { MutationTree } from "vuex";
import { Web3MutationName } from "./names";
import { Web3State } from "./state";

const mutations: MutationTree<Web3State> = {
  // Mutations to set initialized
  [Web3MutationName.setInitialized](state, initialized: boolean) {
    state.initialized = initialized;
  },
  // Mutations to set loading
  [Web3MutationName.setLoading](state, loading: boolean) {
    state.loading = loading;
  },
  // Mutations to set status
  [Web3MutationName.setStatus](state, status: "login" | "logout" | "loading") {
    state.status = status;
  },
  // Mutations to set message
  [Web3MutationName.setMessage](state, message: string) {
    state.message = message;
  },
  [Web3MutationName.setNetwork](state, network: number) {
    state.network = network;
    state.networkName = SUPPORTED_NETWORK[network] || "";
  }
};

export default mutations;
