import { Web3MutationName } from "./names";
import { MutationTree } from "vuex";
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
  }
};

export default mutations;
