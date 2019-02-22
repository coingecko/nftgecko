export const FILENAME = [
  "gods-unchained",
  "my-crypto-heroes-hero",
  "my-crypto-heroes-extension",
  "marble-nft",
  "coingecko",
  "su-squares"
];

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
