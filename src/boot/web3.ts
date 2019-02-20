import { Web3Class } from "src/helper/class/Web3Class";
import { BootInput } from "../types/boot";

let web3Instance: Web3Class;

// leave the export, even if you don't use it
export default async ({ app, router, Vue }: BootInput) => {
  web3Instance = new Web3Class();
};

export { web3Instance };
