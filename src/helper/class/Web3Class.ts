import Web3 from "web3";
import { Contract } from "web3-eth-contract/types";

export class Web3Class {
  public web3: Web3 | null = null;
  public token: Contract | null = null;
  public isTrust = false;
  public isCoinBase = false;

  // ==========MUTATIONS==========
  /** Change web3
   * @param {*} web3
   * @memberof Web3Class
   */
  public setWeb3(web3: any) {
    if (window.Trust) {
      this.web3 = window.web3;
      this.isTrust = true;
      return;
    }

    try {
      this.web3 = new Web3(web3);
    } catch (err) {
      this.web3 = window.web3;
    }
  }

  // ==========ACTIONS==========

  /** getAvailableAddress: get all the address in web3 wallet
   * @returns {Promise<string[]>}
   * @memberof Web3Class
   */
  public getAvailableAddress(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.web3!.eth.getAccounts((err1, res1) => {
        if (err1) {
          // < v1
          reject(err1);
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
    if (this.isTrust) {
      this.token = (this.web3!.eth as any).contract(abiJson).at(address);
      return;
    }
    try {
      this.token = new this.web3!.eth.Contract(abiJson, address, {
        from: acc,
        gasPrice: "20000000000"
      } as any);
    } catch (err) {
      this.token = (window.web3.eth as any).contract(abiJson).at(address);
    }
  }

  public getBalance(acc: string): Promise<number> {
    return new Promise((resolve, reject) => {
      if (this.isTrust) {
        try {
          (this.token as any).balanceOf(acc, (err: Error, val: number) => {
            if (err) {
              resolve(0);
            }
            resolve(val);
          });
        } catch (err) {
          resolve(0);
        }
      } else {
        this.token!.methods.balanceOf(acc)
          .call()
          .then(resolve)
          .catch((err: any) => {
            resolve(0);
          });
      }
    });
  }

  /** getTokenWithId:
   * Get tokenId by passing in a key (Key generated with an array in ascending order from 0 -> balanceOf no)
   * @param {string} acc
   * @param {number} key
   * @returns {number} tokenId
   */
  public getTokenWithId(acc: string, key: number): Promise<number> {
    // return this.token!.methods.tokenOfOwnerByIndex(acc, key).call();
    return new Promise((resolve, reject) => {
      if (this.isTrust) {
        (this.token! as any).tokenOfOwnerByIndex(
          acc,
          key,
          (err: Error, res: number) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          }
        );
      } else {
        this.token!.methods.tokenOfOwnerByIndex(acc, key)
          .call()
          .then(resolve)
          .catch(reject);
      }
    });
  }

  public getURI(tokenId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.isTrust) {
        (this.token! as any).tokenURI(tokenId, (err: Error, res: string) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      } else {
        this.token!.methods.tokenURI(tokenId)
          .call()
          .then(resolve);
      }
    });
  }

  public getId(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (this.isTrust) {
        (this.web3!.version as any).getNetwork((err: Error, res: number) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      } else {
        this.web3!.eth.net.getId((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    });
  }
}
