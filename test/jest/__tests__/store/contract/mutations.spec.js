import mutations from "src/store/contract/mutations";
import { ContractMutationName } from "src/store/contract/names";
import cgJson from "src/contracts/contract/coingecko/contract.json";
import marbleJson from "src/contracts/contract/marble-nft/contract.json";

const contractsData = [cgJson, marbleJson];

describe("[Contract Mutations]", () => {
  let state = {
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
        ids: [{ id: 123, image: "" }],
        name: "coingecko",
        thumb: ""
      },
      "marble-nft": {
        abi: "openzeppelin.abi.json",
        address: "0x1d963688fe2209a98db35c67a041524822cf04ff",
        balance: 0,
        ids: [{ id: 123, image: "" }],
        name: "marble-nft",
        thumb: ""
      }
    },
    name: "coingecko"
  };

  it("[Mutations] updateCompKey", () => {
    mutations[ContractMutationName.updateCompKey](state, null);
    expect(state.compKey).toBe(1);
  });

  it("[Mutations] setLoading", () => {
    mutations[ContractMutationName.setLoading](state, true);
    expect(state.loading).toBe(true);
  });

  it("[Mutations] setAddress", () => {
    const addr = "0x123455";
    mutations[ContractMutationName.setAddress](state, addr);
    expect(state.address).toBe(addr);
  });

  it("[Mutations] setContractsData", () => {
    const payload = {
      contracts: [marbleJson, cgJson],
      names: ["marble-nft", "coingecko"]
    };
    mutations[ContractMutationName.setContractsData](state, payload);
    expect(state.contractsData).toEqual(payload.contracts);
    expect(state.names).toEqual(payload.names);
    expect(state.contractDetails).toEqual({
      coingecko: {
        abi: cgJson.abi,
        address: cgJson.contract.contract_address,
        balance: 0,
        ids: [],
        name: payload.names[1],
        thumb: cgJson.image.thumb
      },
      "marble-nft": {
        abi: marbleJson.abi,
        address: marbleJson.contract.contract_address,
        balance: 0,
        ids: [],
        name: payload.names[0],
        thumb: marbleJson.image.thumb
      }
    });
  });

  it("[Mutations] setSpecificContractData", () => {
    state.contractDetails = {};
    const payload = {
      name: "coingecko",
      contract: cgJson
    };
    mutations[ContractMutationName.setSpecificContractData](state, payload);
    expect(state.contractDetails).toEqual({
      coingecko: {
        abi: cgJson.abi,
        address: cgJson.contract.contract_address,
        balance: 0,
        ids: [],
        name: payload.name,
        thumb: cgJson.image.thumb
      }
    });
  });

  it("[Mutations] setContractsBalance", () => {
    mutations[ContractMutationName.setContractsBalance](state, {
      name: "coingecko",
      bal: 5
    });
    expect(state.contractDetails["coingecko"].balance).toBe(5);
  });

  it("[Mutations] addNftIds", () => {
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 5
    });
    expect(state.contractDetails["coingecko"].ids).toEqual([
      { id: 5, image: "" }
    ]);
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 6
    });
    expect(state.contractDetails["coingecko"].ids).toEqual([
      { id: 5, image: "" },
      { id: 6, image: "" }
    ]);
  });

  it("[Mutations] setNftImages", () => {
    state.name = "coingecko";
    mutations[ContractMutationName.setNftImages](state, {
      id: 5,
      image: "img5a"
    });
    expect(state.contractDetails["coingecko"].ids).toEqual([
      { id: 5, image: "img5a" },
      { id: 6, image: "" }
    ]);
    mutations[ContractMutationName.setNftImages](state, {
      id: 6,
      image: "img6b"
    });
    expect(state.contractDetails["coingecko"].ids).toEqual([
      { id: 5, image: "img5a" },
      { id: 6, image: "img6b" }
    ]);
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 7
    });
    mutations[ContractMutationName.setNftImages](state, {
      id: 7,
      image: "img7c"
    });
    expect(state.contractDetails["coingecko"].ids).toEqual([
      { id: 5, image: "img5a" },
      { id: 6, image: "img6b" },
      { id: 7, image: "img7c" }
    ]);
  });

  it("[Mutations] setName", () => {
    const name = "random_str";
    mutations[ContractMutationName.setName](state, name);
    expect(state.name).toBe(name);
  });
});
