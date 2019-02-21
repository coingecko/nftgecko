export const FILENAME = [
  "coingecko",
  "marble-nft",
  "my-crypto-heroes-hero",
  "my-crypto-heroes-extension",
  "su-squares",
  "gods-unchained"
];

export const supportedNetwork: Set<number> = new Set([
  1, // ethereum (mainnet)
  88, // Tomochain (mainnet)
]);

/**
 * @returns {Promise<Array<ContractJson>>}
 */
export const loadAllContract = async () => {
  const loadJson = FILENAME.map((name) => import(`./${name}/contract.json`));
  return Promise.all([...loadJson]);
};

export const loadSpecificContract = async (name: string) => {
  return import(`./${name}/contract.json`);
};
