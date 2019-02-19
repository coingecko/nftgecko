import getters from "src/store/contract/getters";
import { ContractGetterName } from "src/store/contract/names";
import cgJson from "src/contracts/contract/coingecko/contract.json";
import marbleJson from "src/contracts/contract/marble-nft/contract.json";

const contractsData = [cgJson, marbleJson];

describe("[Contract Getters]", () => {
  const state = {
    compKey: 0,
    address: "0xabc",
    loading: true,
    contractsData: contractsData,
    names: [],
    contractDetails: {
      coingecko: {
        abi: "openzeppelin.abi.json",
        address: "0xfd98724f1c8a36c7be155cddce51b456eb1eb08d",
        balance: 0,
        ids: [123],
        name: "coingecko"
      },
      "marble-nft": {
        abi: "openzeppelin.abi.json",
        address: "0x1d963688fe2209a98db35c67a041524822cf04ff",
        balance: 0,
        ids: [234],
        name: "marble-nft"
      }
    },
    name: ""
  };

  it("[Getters] getLoading", () => {
    expect(getters[ContractGetterName.getLoading](state)).toBe(state.loading);
  });

  it("[Getters] getCurrentAddress", () => {
    expect(getters[ContractGetterName.getCurrentAddress](state)).toBe(
      state.address
    );
  });

  it("[Getters] getContractAdresses", () => {
    expect(getters[ContractGetterName.getContractAdresses](state)).toEqual([
      cgJson.contract.contract_address,
      marbleJson.contract.contract_address
    ]);
  });

  it("[Getters] getContractDetails", () => {
    expect(getters[ContractGetterName.getContractDetails](state)).toEqual([
      state.contractDetails.coingecko,
      state.contractDetails["marble-nft"]
    ]);
  });

  it("[Getters] getNFTImages", () => {
    expect(
      getters[ContractGetterName.getNFTImages](state, "coingecko")
    ).toEqual(state.contractDetails.coingecko.ids);
  });
});
