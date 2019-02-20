import Web3 from "web3";

export class Web3Class {
  /** @type {Web3} */
  web3;
  /** @type {Object} */
  token = {};
  abi = {};

  constructor() {
    this.web3 = window.web3;
  }

  // ==========MUTATIONS==========
  /** Change web3
   * @param {*} web3
   * @memberof Web3Class
   */
  setWeb3(web3) {
    this.web3 = new Web3(web3);
    return;
  }

  // ==========ACTIONS==========

  /** getAvailableAddress: get all the address in web3 wallet
   * @returns {Promise<string[]>}
   * @memberof Web3Class
   */
  getAvailableAddress() {
    return this.web3.eth.getAccounts();
  }

  /** setContract: Setup this.token
   * @param {{abiAddress: string, address: string, acc: string}} payload
   * @memberof Web3Class
   */
  async setContract({ abiAddress, address, acc }) {
    const res = await fetch(`abi/${abiAddress}`);
    const abiJson = await res.json();
    this.abi = { ...this.abi, [address]: abiJson };
    this.token = new this.web3.eth.Contract(abiJson, address, {
      from: acc,
      gasPrice: "20000000000"
    });
    return;
  }

  /** getBalance: Get total balance of the particular NFT (this.token must exist)
   * @param {string} acc
   * @returns {number} balance
   */
  getBalance(acc) {
    return this.token.methods
      .balanceOf(acc)
      .call()
      .catch(() => 0);
  }

  /** getTokenWithId: Get tokenId by passing in a key (Key generated with an array in ascending order from 0 -> balanceOf no)
   * @param {string} acc
   * @param {number} key
   * @returns {number} tokenId
   */
  getTokenWithId(acc, key) {
    return this.token.methods.tokenOfOwnerByIndex(acc, key).call();
  }

  getURI(tokenId) {
    return this.token.methods.tokenURI(tokenId).call();
  }
}
