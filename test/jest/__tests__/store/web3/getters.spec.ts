import getters from "src/store/web3/getters";
import { Web3GetterName } from "src/store/web3/names";
import { Web3State } from "src/store/web3/state";

describe("[Web3 Getters]", () => {
  const state: Web3State = {
    loading: false,
    status: "loading",
    message: "rng",
    initialized: false,
    network: 69,
    networkName: "ethereum",
  };

  it("[Getters] web3Loading", () => {
    expect(getters[Web3GetterName.web3Loading](state, getters, {} as any, {})).toBe(state.loading);
  });

  it("[Getters] web3Initialize", () => {
    expect(getters[Web3GetterName.web3Initialize](state, getters, {} as any, {})).toBe(
      state.initialized,
    );
  });

  it("[Getters] web3LoadingMessage", () => {
    expect(getters[Web3GetterName.web3LoadingMessage](state, getters, {} as any, {})).toBe(
      state.message,
    );
  });

  it("[Getters] web3Status", () => {
    expect(getters[Web3GetterName.web3Status](state, getters, {} as any, {})).toBe(state.status);
  });

  it("[Getters] web3Network", () => {
    expect(getters[Web3GetterName.web3Network](state, getters, {} as any, {})).toBe(state.network);
  });
});
