import { web3Instance } from "src/boot/web3";
import {
  FILE,
  loadAllContract,
  loadSpecificContract,
  SUPPORTED_NETWORK
} from "src/contracts/contract";
import { errorNotification } from "src/helper/notifications";
import { range } from "src/helper/utils";
import { ActionTree } from "vuex";
import { RootState } from "..";
import { ContractActionName, ContractMutationName } from "./names";
import { ContractState } from "./state";

const actions: ActionTree<ContractState, RootState> = {
  /** [Private] Setup ETH Address */
  async [ContractActionName.setupAddress]({ commit, rootState }) {
    let acc: string[];
    if (rootState.route.query.address) {
      acc = [rootState.route.query.address];
    } else {
      acc = await web3Instance.getAvailableAddress();
    }
    commit(ContractMutationName.setAddress, acc[0]);
  },
  /** [Private] Load all NFTs (with img id) */
  async [ContractActionName.loadAllNfts](
    { state, commit, rootState },
    name: string,
    network?: number
  ) {
    const currentNetwork = network || rootState.web3.network;
    if (!currentNetwork) {
      // if current network not exist
      return;
    }
    const currentNetworkName = SUPPORTED_NETWORK[currentNetwork];
    // Generate an array (something like python range)
    const numArr = range(
      0,
      state.contractDetails[currentNetworkName][name].balance
    );
    // load function from contract.ts
    const {
      genImg,
      getSupportImgShortcut
    } = await import(`src/contracts/contract/${currentNetworkName}/${name}/contract.ts`);
    numArr.forEach(async key => {
      const tokenId = await web3Instance.getTokenWithId(state.address, key);
      commit(ContractMutationName.addNftIds, {
        name,
        id: tokenId,
        network: currentNetworkName
      });
      if (getSupportImgShortcut()) {
        // if shortcut exist
        commit(ContractMutationName.setNftImages, {
          id: tokenId,
          image: genImg({ id: tokenId }),
          network: currentNetworkName
        });
      } else {
        // if shorcut not exist, make RPC call
        const uri = await web3Instance.getURI(tokenId);
        const res = await fetch(uri);
        const jsonData = await res.json();
        commit(ContractMutationName.setNftImages, {
          id: tokenId,
          image: genImg({ id: tokenId }, jsonData)
        });
      }
    });
  },
  /** Load all JSON Contract JSON data */
  async [ContractActionName.loadAllJson](
    { state, commit, rootState },
    nw: string
  ) {
    const network =
      nw || rootState.web3.networkName || rootState.route.params.network;
    const jsonData = await loadAllContract(network);
    commit(ContractMutationName.setContractsData, {
      contracts: jsonData,
      names: FILE[network].filename,
      network
    });
  },
  /** Load Specific JSON Contract data */
  async [ContractActionName.loadSpecificJson](
    { commit, rootState },
    { name, network }: { name: string; network: string }
  ) {
    const jsonData = await loadSpecificContract(
      network || rootState.web3.networkName,
      name
    );
    //
    commit(ContractMutationName.setSpecificContractData, {
      name,
      contract: jsonData,
      network
    });
  },
  /** Update an array NFTs on balance (use in main page) */
  async [ContractActionName.updateBalance]({ state, commit, rootState }) {
    const networkName = rootState.web3.networkName;
    const acc = state.address;
    Object.keys(state.contractDetails[networkName]).forEach(async contract => {
      const { name, address, abi } = state.contractDetails[networkName][
        contract
      ];
      await web3Instance.setContract({ abi, address, acc });
      const bal = await web3Instance.getBalance(acc);
      commit(ContractMutationName.setContractsBalance, {
        name,
        bal,
        network: networkName
      });
    });
  },
  /** Load all JSON Contract data */
  async [ContractActionName.loadAllContracts](
    { state, commit, dispatch },
    network?: string
  ) {
    commit(ContractMutationName.setLoading, true);
    commit(ContractMutationName.updateCompKey);
    if (state.address === "") {
      await dispatch(ContractActionName.setupAddress);
    }
    await dispatch(ContractActionName.loadAllJson, network);
    const acc = state.address;
    if (acc === "") {
      errorNotification("contract.error.no_acc");
      commit(ContractMutationName.setLoading, false);
      return;
    }
    dispatch(ContractActionName.updateBalance);
    commit(ContractMutationName.setLoading, false);
  },
  async [ContractActionName.loadSpecificContract](
    { state, commit, dispatch, rootState },
    { name, network }: { name: string; network?: string }
  ) {
    const networkName = network || rootState.web3.networkName;
    if (state.address === "") {
      await dispatch(ContractActionName.setupAddress);
    }
    await dispatch(ContractActionName.loadSpecificJson, { name, network });
    const acc = state.address;
    if (acc === "") {
      errorNotification("contract.error.no_acc");
      commit(ContractMutationName.setLoading, false);
      return;
    }
    const { address, abi } = state.contractDetails[networkName][name];
    await web3Instance.setContract({ abi, address, acc });
    const bal = await web3Instance.getBalance(acc);
    commit(ContractMutationName.setContractsBalance, { name, bal, network });
    if (bal === 0) {
      return;
    }
    dispatch(ContractActionName.loadAllNfts, name);
  }
};

export default actions;
