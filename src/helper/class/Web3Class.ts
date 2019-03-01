import Web3 from "web3";
import { Contract } from "web3-eth-contract/types";

export class Web3Class {
  public web3: Web3 | null = null;
  public token: Contract | null = null;

  // ==========MUTATIONS==========
  /** Change web3
   * @param {*} web3
   * @memberof Web3Class
   */
  public setWeb3(web3: any) {
    this.web3 = new Web3(web3);
  }

  // ==========ACTIONS==========

  /** getAvailableAddress: get all the address in web3 wallet
   * @returns {Promise<string[]>}
   * @memberof Web3Class
   */
  public getAvailableAddress(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      // v1
      this.web3!.eth.getAccounts((err1, res1) => {
        if (err1) {
          // < v1
          window.web3.eth.getAccounts((err2, res2: any) => {
            if (err2) {
              reject(err2);
            }
            resolve([res2]);
          });
        } else {
          resolve(res1);
        }
      });
    });
  }

  /** setContract: Setup this.token
   * @param {{abi: string, address: string, acc: string}} payload
   * @memberof Web3Class
   */
  public async setContract({
    abi,
    address,
    acc
  }: {
    abi: string;
    address: string;
    acc: string;
  }) {
    const res = await fetch(`abi/${abi}`);
    const abiJson = await res.json();
    this.token = new this.web3!.eth.Contract(abiJson, address, {
      from: acc,
      gasPrice: "20000000000"
    } as any);
    return;
  }

  /** getBalance: Get total balance of the particular NFT (this.token must exist)
   * @param {string} acc
   * @returns {number} balance
   */
  public getBalance(acc: string) {
    return this.token!.methods.balanceOf(acc)
      .call()
      .catch((err: any) => {
        return 0;
      });
  }

  /** getTokenWithId:
   * Get tokenId by passing in a key (Key generated with an array in ascending order from 0 -> balanceOf no)
   * @param {string} acc
   * @param {number} key
   * @returns {number} tokenId
   */
  public getTokenWithId(acc: string, key: number) {
    return this.token!.methods.tokenOfOwnerByIndex(acc, key).call();
  }

  public getURI(tokenId: number) {
    return this.token!.methods.tokenURI(tokenId).call();
  }

  public getId(): Promise<number> {
    return new Promise((resolve, reject) => {
      // v1
      this.web3!.eth.net.getId((err1, res1) => {
        if (err1) {
          // < v1
          (window.web3!.version as any).getNetwork((err2: any, res2: any) => {
            if (err2) {
              reject(err2);
            }
            resolve(res2);
          });
        } else {
          resolve(res1);
        }
      });
    });
  }
}
