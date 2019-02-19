import Vue from "vue";
import { ContractMutationName } from "./names";

/** @typedef {import("./state").default} ContractState */

/**
 * @type {import("vuex").MutationTree<ContractState>}
 */
const mutations = {
  // Mutations to update component key (for rerender purpose)
  [ContractMutationName.updateCompKey](state) {
    state.compKey++;
  },
  // Mutations to set loading status
  [ContractMutationName.setLoading](state, /** @type {boolean} */ loading) {
    state.loading = loading;
  },
  // Mutations to set eth address
  [ContractMutationName.setAddress](state, /** @type {string} */ address) {
    state.address = address;
  },
  // Mutations to set contracts data
  [ContractMutationName.setContractsData](
    state,
    /** @type {{contracts: Object[], names: string[]}} */ contracts
  ) {
    state.contractsData = contracts.contracts;
    state.names = contracts.names;
    contracts.names.forEach((name, key) => {
      Vue.set(state.contractDetails, name, {
        ...state.contractDetails[name],
        name,
        thumb: contracts.contracts[key].image.thumb,
        address: contracts.contracts[key].contract.contract_address,
        abi: contracts.contracts[key].abi,
        balance: 0,
        ids: []
      });
    });
  },
  [ContractMutationName.setSpecificContractData](
    state,
    /** @type {{contract: Object, name: string}} */ payload
  ) {
    state.contractDetails = {
      ...state.contractDetails,
      [payload.name]: {
        name: payload.name,
        address: payload.contract.contract.contract_address,
        abi: payload.contract.abi,
        balance: 0,
        ids: []
      }
    };
  },
  // Mutation to set Contract Balance
  [ContractMutationName.setContractsBalance](
    state,
    /** @type {{name: string, bal: number}} */
    { name, bal }
  ) {
    Vue.set(state.contractDetails, name, {
      ...state.contractDetails[name],
      balance: bal
    });
  },
  // action to add nfts
  [ContractMutationName.addNftIds](
    state,
    /** @type {{name: string, id: number}} */ payload
  ) {
    const { name, id } = payload;
    Vue.set(state.contractDetails, name, {
      ...state.contractDetails[name],
      ids: [...state.contractDetails[name].ids, { id, image: "" }]
    });
  },
  // action to set img (Need to add id first)
  [ContractMutationName.setNftImages](
    state,
    /** @type {{id: number, image: string}} */
    { id, image }
  ) {
    const contractDetails = state.contractDetails[state.name];
    const idKey = contractDetails.ids.findIndex(el => el.id === id);
    const formattedKey = idKey === -1 ? NaN : idKey;
    const beforeIds = contractDetails.ids.slice(
      0,
      isNaN(formattedKey) ? contractDetails.ids.length - 1 : formattedKey
    );
    const afterIds = isNaN(formattedKey)
      ? []
      : contractDetails.ids.slice(formattedKey + 1, contractDetails.ids.length);

    Vue.set(state.contractDetails, state.name, {
      ...contractDetails,
      ids: [...beforeIds, { id, image }, ...afterIds]
    });
  },
  // set name
  [ContractMutationName.setName](state, /** @type {string} */ name) {
    state.name = name;
  }
};

export default mutations;
