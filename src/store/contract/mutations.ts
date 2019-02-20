import Vue from "vue";
import { ContractMutationName } from "./names";
import { MutationTree } from "vuex";
import { ContractState } from "./state";
import { ContractJson } from "src/types/contractJson";

const mutations: MutationTree<ContractState> = {
  // Mutations to update component key (for rerender purpose)
  [ContractMutationName.updateCompKey](state) {
    state.compKey++;
  },
  // Mutations to set loading status
  [ContractMutationName.setLoading](state, loading: boolean) {
    state.loading = loading;
  },
  // Mutations to set eth address
  [ContractMutationName.setAddress](state, address: string) {
    state.address = address;
  },
  // Mutations to set contracts data
  [ContractMutationName.setContractsData](
    state,
    contracts: { contracts: ContractJson[]; names: string[] }
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
    payload: { contract: ContractJson; name: string }
  ) {
    state.contractDetails = {
      ...state.contractDetails,
      [payload.name]: {
        name: payload.name,
        address: payload.contract.contract.contract_address,
        abi: payload.contract.abi,
        balance: 0,
        ids: [],
        thumb: payload.contract.image.thumb
      }
    };
  },
  // Mutation to set Contract Balance
  [ContractMutationName.setContractsBalance](
    state,
    { name, bal }: { name: string; bal: number }
  ) {
    Vue.set(state.contractDetails, name, {
      ...state.contractDetails[name],
      balance: bal
    });
  },
  // action to add nfts
  [ContractMutationName.addNftIds](
    state,
    { name, id }: { name: string; id: number }
  ) {
    Vue.set(state.contractDetails, name, {
      ...state.contractDetails[name],
      ids: [...state.contractDetails[name].ids, { id, image: "" }]
    });
  },
  // action to set img (Need to add id first)
  [ContractMutationName.setNftImages](
    state,
    { id, image }: { id: number; image: string }
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
  [ContractMutationName.setName](state, name: string) {
    state.name = name;
  }
};

export default mutations;
