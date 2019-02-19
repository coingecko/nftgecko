/** @typedef {{name: string, description: string, official_site: string, abi: string, image: {thumb: string, small: string, large: string}, contract: {contract_address: string, standard: string, image_address?: string}}} ContractJson */

export default {
  /** @type {number} */
  compKey: 0,
  /** @type {string} */
  address: "",
  /** @type {boolean} */
  loading: true,
  /** @type {ContractJson[]} */
  contractsData: [],
  /** @type {string[]} */
  names: [],
  /** @type {{[contract: string]: {address: string, name: string, abi: string, balance: number, ids: Array<{id: number, image: string}>, thumb: string}}} */
  contractDetails: {},
  /** @type {string} */
  name: ""
};
