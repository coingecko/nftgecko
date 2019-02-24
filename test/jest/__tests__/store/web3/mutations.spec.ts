import mutations from "src/store/web3/mutations";
import { Web3MutationName } from "src/store/web3/names";
import { Web3State } from "src/store/web3/state";

describe("[Web3 Mutations]", () => {
  const state: Web3State = {
    loading: false,
    status: "loading",
    message: "",
    initialized: false,
    network: 70,
    networkName: "ethereum"
  };

  it("[Mutations] setInitialized", () => {
    mutations[Web3MutationName.setInitialized](state, true);
    expect(state.initialized).toBe(true);
  });

  it("[Mutations] setLoading", () => {
    mutations[Web3MutationName.setLoading](state, true);
    expect(state.loading).toBe(true);
  });

  it("[Mutations] setStatus", () => {
    mutations[Web3MutationName.setStatus](state, "login");
    expect(state.status).toBe("login");
  });

  it("[Mutations] setMessage", () => {
    mutations[Web3MutationName.setMessage](state, "random msg");
    expect(state.message).toBe("random msg");
  });

  it("[Mutations] setNetwork", () => {
    mutations[Web3MutationName.setNetwork](state, 88);
    expect(state.network).toBe(88);
  });
});
