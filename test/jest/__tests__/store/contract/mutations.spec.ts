import cgJson from "src/contracts/contract/ethereum/coingecko/contract.json";
import marbleJson from "src/contracts/contract/ethereum/marble-nft/contract.json";
import mutations from "src/store/contract/mutations";
import { ContractMutationName } from "src/store/contract/names";
import { ContractState } from "src/store/contract/state";

const contractsData = [cgJson, marbleJson];

describe("[Contract Mutations]", () => {
  let state: ContractState;
  const network = "ethereum";

  beforeEach(() => {
   state = {
      compKey: 0,
      address: "0xabc",
      loading: true,
      contractsData: {
        [network]: contractsData,
      },
      names: [],
      contractDetails: {
        [network]: {
          "coingecko": {
            abi: "openzeppelin.abi.json",
            address: "0xfd98724f1c8a36c7be155cddce51b456eb1eb08d",
            balance: 0,
            ids: [{ id: 123, image: "" }],
            name: "coingecko",
            thumb: "",
          },
          "marble-nft": {
            abi: "openzeppelin.abi.json",
            address: "0x1d963688fe2209a98db35c67a041524822cf04ff",
            balance: 0,
            ids: [{ id: 123, image: "" }],
            name: "marble-nft",
            thumb: "",
          },
        },
      },
      name: "coingecko",
    };
  });

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
      names: ["marble-nft", "coingecko"],
      network,
    };
    mutations[ContractMutationName.setContractsData](state, payload);
    expect(state.contractsData[payload.network]).toEqual(payload.contracts);
    expect(state.contractDetails.ethereum).toEqual({
      "coingecko": {
        abi: cgJson.abi,
        address: cgJson.contract.contract_address,
        balance: 0,
        ids: [],
        name: payload.names[1],
        thumb: cgJson.image.thumb,
      },
      "marble-nft": {
        abi: marbleJson.abi,
        address: marbleJson.contract.contract_address,
        balance: 0,
        ids: [],
        name: payload.names[0],
        thumb: marbleJson.image.thumb,
      },
    });
  });

  it("[Mutations] setSpecificContractData", () => {
    state.contractDetails = {};
    const payload = {
      name: "coingecko",
      contract: cgJson,
      network,
    };
    mutations[ContractMutationName.setSpecificContractData](state, payload);
    expect(state.contractDetails[payload.network]).toEqual({
      coingecko: {
        abi: cgJson.abi,
        address: cgJson.contract.contract_address,
        balance: 0,
        ids: [],
        name: payload.name,
        thumb: cgJson.image.thumb,
      },
    });
  });

  it("[Mutations] setContractsBalance", () => {
    mutations[ContractMutationName.setContractsBalance](state, {
      name: "coingecko",
      bal: 6,
      network,
    });
    expect(state.contractDetails[network].coingecko.balance).toBe(6);
  });

  it("[Mutations] addNftIds", () => {
    state.contractDetails[network].coingecko.ids = [];
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 5,
      network,
    });
    expect(state.contractDetails[network].coingecko.ids).toEqual([{ id: 5, image: "" }]);
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 6,
      network,
    });
    expect(state.contractDetails[network].coingecko.ids).toEqual([
      { id: 5, image: "" },
      { id: 6, image: "" },
    ]);
  });

  it("[Mutations] setNftImages", () => {
    state.name = "coingecko";
    state.contractDetails[network].coingecko.ids = [];
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 5,
      network,
    });
    mutations[ContractMutationName.setNftImages](state, {
      id: 5,
      image: "img5a",
      network,
    });
    expect(state.contractDetails.ethereum.coingecko.ids).toEqual([
      { id: 5, image: "img5a" },
    ]);
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 6,
      network,
    });
    mutations[ContractMutationName.setNftImages](state, {
      id: 6,
      image: "img6b",
      network,
    });
    expect(state.contractDetails.ethereum.coingecko.ids).toEqual([
      { id: 5, image: "img5a" },
      { id: 6, image: "img6b" },
    ]);
    mutations[ContractMutationName.addNftIds](state, {
      name: "coingecko",
      id: 7,
      network,
    });
    mutations[ContractMutationName.setNftImages](state, {
      id: 7,
      image: "img7c",
      network,
    });
    expect(state.contractDetails.ethereum.coingecko.ids).toEqual([
      { id: 5, image: "img5a" },
      { id: 6, image: "img6b" },
      { id: 7, image: "img7c" },
    ]);
  });

  it("[Mutations] setName", () => {
    const name = "random_str";
    mutations[ContractMutationName.setName](state, name);
    expect(state.name).toBe(name);
  });
});
