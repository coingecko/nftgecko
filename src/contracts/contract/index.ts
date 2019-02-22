const ETHEREUM_FILENAME = [
  "coingecko",
  "marble-nft",
  "my-crypto-heroes-hero",
  "my-crypto-heroes-extension",
  "su-squares",
  "gods-unchained"
];
const TOMOCHAIN_FILENAME: string[] = [];
const TOMOCHAIN_TESTNET_FILENAME: string[] = [];

interface IFile {
  [chainNo: number]: {
    filename: string[];
    name: string;
  };
}

export const FILE: IFile = {
  1: {
    filename: ETHEREUM_FILENAME,
    name: "ethereum"
  },
  88: {
    filename: TOMOCHAIN_FILENAME,
    name: "tomochain"
  },
  89: {
    filename: TOMOCHAIN_TESTNET_FILENAME,
    name: "tomochain_testnet"
  }
};

export enum SUPPORTED_NETWORK {
  ethereum = 1,
  tomochain = 88,
  tomochain_testnet = 89
}

/**
 * @returns {Promise<Array<ContractJson>>}
 */
export const loadAllContract = async (network: number) => {
  const { filename, name } = FILE[network];
  const loadJson = filename.map((nftName) =>
    import(`./${name}/${nftName}/contract.json`)
  );
  return Promise.all([...loadJson]);
};

export const loadSpecificContract = async (
  network: number,
  nftName: string
) => {
  const { name } = FILE[network];
  return import(`./${name}/${nftName}/contract.json`);
};
