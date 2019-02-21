import web3, { web3Instance } from "src/boot/web3";
import {
  errorNotification,
  successNotification
} from "src/helper/notifications";
import { ActionTree } from "vuex";
import { Web3ActionName, Web3MutationName } from "./names";
import { Web3State } from "./state";


const actions: ActionTree<Web3State, any> = {
  /** Required to run this after browser loaded */
  async [Web3ActionName.initializeWeb3]({ state, commit }, force = false) {
    commit(Web3MutationName.setLoading, true);
    commit(Web3MutationName.setInitialized, true);
    commit(Web3MutationName.setStatus, "loading");
    commit(Web3MutationName.setMessage, "Loading web3...");
    if (window.ethereum) {
      try {
        commit(
          Web3MutationName.setMessage,
          "Waiting for approval to connect to your account..."
        );
        // Request account access if needed
        await window.ethereum.enable();
        successNotification("web3.success.sign_in");
        commit(Web3MutationName.setLoading, false);
        commit(Web3MutationName.setStatus, "login");
        web3Instance.setWeb3(window.ethereum);
        const network = await web3Instance.getId();
        commit(Web3MutationName.setNetwork, network);
      } catch (err) {
        commit(Web3MutationName.setLoading, false);
        commit(Web3MutationName.setStatus, "logout");
        errorNotification("web3.error.connect_eth_acc");
      }
      console.log(await web3Instance.web3.eth.net.getNetworkType());
    } else if (typeof web3Instance.web3 !== "undefined") {
      web3Instance.setWeb3(web3Instance.web3.currentProvider);
      successNotification("web3.success.sign_in");
      commit(Web3MutationName.setLoading, false);
      commit(Web3MutationName.setStatus, "login");
    } else {
      console.log("[WEB3] No web3 instance injected.");
      commit(Web3MutationName.setLoading, false);
      commit(Web3MutationName.setStatus, "logout");
      errorNotification("web3.error.web3_err");
    }
  },
  async [Web3ActionName.setNetwork]({state, commit}, network?: string) {
    const selectedNetwork = network || await web3Instance.getId();
    commit(Web3MutationName.setNetwork, selectedNetwork);
  }
};

export default actions;
