import { Web3Class } from "src/helper/class/Web3";

/** @type {Web3Class} */
let web3Instance;

// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  web3Instance = new Web3Class();
};

export { web3Instance };
