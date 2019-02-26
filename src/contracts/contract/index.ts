const ETHEREUM_FILENAME = [
  "coingecko",
  "marble-nft",
  "gods-unchained",
  "my-crypto-heroes-hero",
  "my-crypto-heroes-extension",
  "marble-nft",
  "coingecko",
  "su-squares",
];
const TOMOCHAIN_FILENAME: string[] = [];
const TOMOCHAIN_TESTNET_FILENAME: string[] = [
  "coingecko",
];

interface IFile {
  [chainNo: string]: {
    filename: string[];
    name: string;
    id: number
  };
}

export const FILE: IFile = {
  ethereum: {
    filename: ETHEREUM_FILENAME,
    name: "ethereum",
    id: 1,
  },
  tomochain: {
    filename: TOMOCHAIN_FILENAME,
    name: "tomochain",
    id: 88,
  },
  tomochain_testnet: {
    filename: TOMOCHAIN_TESTNET_FILENAME,
    name: "tomochain_testnet",
    id: 89,
  },
};

export enum SUPPORTED_NETWORK {
  ethereum = 1,
  tomochain = 88,
  tomochain_testnet = 89,
}

/**
 * @returns {Promise<Array<ContractJson>>}
 */
export const loadAllContract = async (network: string) => {
  const { filename, name } = FILE[network];
  const loadJson = filename.map((nftName) =>
    import(`./${name}/${nftName}/contract.json`),
  );
  return Promise.all([...loadJson]);
};

export const loadSpecificContract = async (
  network: string,
  nftName: string,
) => {
  return import(`./${network}/${nftName}/contract.json`);
};
