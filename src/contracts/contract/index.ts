export const FILENAME = [
  "coingecko",
  "marble-nft",
  "my-crypto-heroes-hero",
  "my-crypto-heroes-extension",
  "su-squares"
];

/** @typedef {{name: string, description: string, official_site: string, abi: string, image: {thumb: string, small: string, large: string}, contract: {contract_address: string, standard: string, image_address?: string}}} ContractJson */

/**
 * @returns {Promise<Array<ContractJson>>}
 */
export const loadAllContract = async () => {
  const loadJson = FILENAME.map(name => import(`./${name}/contract.json`));
  return Promise.all([...loadJson]);
};

export const loadSpecificContract = async (name: string) => {
  return import(`./${name}/contract.json`);
};
