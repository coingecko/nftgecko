import cgJson from "src/contracts/contract/ethereum/coingecko/contract.json";
import marbleJson from "src/contracts/contract/ethereum/marble-nft/contract.json";
import getters from "src/store/contract/getters";
import { ContractGetterName } from "src/store/contract/names";
import { ContractState } from "src/store/contract/state";

const contractsData = [cgJson, marbleJson];

describe("[Contract Getters]", () => {
  const state: ContractState = {
    compKey: 0,
    address: "0xabc",
    loading: true,
    contractsData: {
      ethereum: contractsData
    },
    names: [],
    contractDetails: {
      ethereum: {
        coingecko: {
          abi: "openzeppelin.abi.json",
          address: "0xfd98724f1c8a36c7be155cddce51b456eb1eb08d",
          balance: 0,
          ids: [{ id: 123, image: "" }],
          name: "coingecko",
          thumb: ""
        },
        "marble-nft": {
          abi: "openzeppelin.abi.json",
          address: "0x1d963688fe2209a98db35c67a041524822cf04ff",
          balance: 0,
          ids: [{ id: 234, image: "" }],
          name: "marble-nft",
          thumb: ""
        }
      }
    },
    name: ""
  };
  const network = "ethereum";

  it("[Getters] getLoading", () => {
    expect(
      getters[ContractGetterName.getLoading](state, {}, {} as any, {})
    ).toBe(state.loading);
  });

  it("[Getters] getCurrentAddress", () => {
    expect(
      getters[ContractGetterName.getCurrentAddress](state, {}, {} as any, {})
    ).toBe(state.address);
  });

  it("[Getters] getContractAdresses", () => {
    expect(
      getters[ContractGetterName.getContractAdresses](state, {}, {} as any, {})(network)
    ).toEqual([
      cgJson.contract.contract_address,
      marbleJson.contract.contract_address
    ]);
  });

  it("[Getters] getContractDetails", () => {
    expect(
      getters[ContractGetterName.getContractDetails](state, {}, {} as any, {})(network)
    ).toEqual([
      state.contractDetails[network].coingecko,
      state.contractDetails[network]["marble-nft"]
    ]);
  });

  it("[Getters] getNFTImages", () => {
    state.name = "coingecko";
    expect(
      getters[ContractGetterName.getNFTImages](state, {}, {} as any, {})(network)
    ).toEqual(state.contractDetails[network].coingecko.ids);
  });
});
