import getters from "src/store/web3/getters";
import { Web3GetterName } from "src/store/web3/names";

describe("[Web3 Getters]", () => {
  const state = {
    loading: false,
    status: "loading",
    message: "rng",
    initialized: false
  };

  it("[Getters] web3Loading", () => {
    expect(getters[Web3GetterName.web3Loading](state)).toBe(state.loading);
  });

  it("[Getters] web3Initialize", () => {
    expect(getters[Web3GetterName.web3Initialize](state)).toBe(
      state.initialized
    );
  });

  it("[Getters] web3LoadingMessage", () => {
    expect(getters[Web3GetterName.web3LoadingMessage](state)).toBe(
      state.message
    );
  });

  it("[Getters] web3Status", () => {
    expect(getters[Web3GetterName.web3Status](state)).toBe(state.status);
  });
});
