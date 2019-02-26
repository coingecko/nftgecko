import { ContractJson } from "src/types/contractJson";
import Vue from "vue";
import { MutationTree } from "vuex";
import { ContractMutationName } from "./names";
import { ContractState } from "./state";

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
    {
      contracts,
      names,
      network,
    }: { contracts: ContractJson[]; names: string[]; network: string },
  ) {
    Vue.set(state.contractsData, network, contracts);
    names.forEach((name, key) => {
      Vue.set(state.contractDetails, network, {
        ...state.contractDetails[network],
        [name]: {
          ...state.contractDetails[name],
          name,
          thumb: contracts[key].image.thumb,
          address: contracts[key].contract.contract_address,
          abi: contracts[key].abi,
          balance: 0,
          ids: [],
        },
      });
    });
  },
  [ContractMutationName.setSpecificContractData](
    state,
    {
      contract,
      name,
      network,
    }: { contract: ContractJson; name: string; network: string },
  ) {
    Vue.set(state.contractDetails, network, {
      ...state.contractDetails[network],
      [name]: {
        name,
        address: contract.contract.contract_address,
        abi: contract.abi,
        balance: 0,
        ids: [],
        thumb: contract.image.thumb,
      },
    });
  },
  // Mutation to set Contract Balance
  [ContractMutationName.setContractsBalance](
    state,
    { name, bal, network }: { name: string; bal: number; network: string },
  ) {
    // return {
    //   ...state.contractDetails[network],
    //   [network]: {
    //     ...state.contractDetails[network][name],
    //     balance: bal
    //   }
    // }
    Vue.set(state.contractDetails[network], name, {
      ...state.contractDetails[network][name],
      balance: bal,
    });
  },
  // action to add nfts
  [ContractMutationName.addNftIds](
    state,
    { name, id, network }: { name: string; id: number; network: string },
  ) {
    Vue.set(state.contractDetails, network, {
      ...state.contractDetails[network],
      [name]: {
        ...state.contractDetails[network][name],
        ids: [...state.contractDetails[network][name].ids, { id, image: "" }],
      },
    });
  },
  // action to set img (Need to add id first)
  [ContractMutationName.setNftImages](
    state,
    { id, image, network }: { id: number; image: string; network: string },
  ) {
    const contractDetails = state.contractDetails[network][state.name];
    const idKey = contractDetails.ids.findIndex((el) => el.id === id);
    const formattedKey = idKey === -1 ? NaN : idKey;
    const beforeIds = contractDetails.ids.slice(
      0,
      isNaN(formattedKey) ? contractDetails.ids.length - 1 : formattedKey,
    );
    const afterIds = isNaN(formattedKey)
      ? []
      : contractDetails.ids.slice(formattedKey + 1, contractDetails.ids.length);
    Vue.set(state.contractDetails, network, {
      ...state.contractDetails[network],
      [state.name]: {
        ...contractDetails,
        ids: [...beforeIds, { id, image }, ...afterIds],
      },
    });
  },
  // set name
  [ContractMutationName.setName](state, name: string) {
    state.name = name;
  },
};

export default mutations;
