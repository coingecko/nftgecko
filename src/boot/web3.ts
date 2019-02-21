import { Web3Class } from "src/helper/class/Web3Class";
// @ts-ignore
import store from "src/store";
import { ActionsName } from "../store/indexts";
import { BootInput } from "../types/boot";

let web3Instance: Web3Class;

// leave the export, even if you don't use it
export default async ({ app, router, Vue }: BootInput) => {
  web3Instance = new Web3Class();
  // Vuex Watch for sign in

  let tempInterval: any = null;
  store.watch((newValue: any, oldValue: any) => {
    if (oldValue.web3  && newValue.web3.status === oldValue.web3.status) {
      return;
    }
    if (newValue.web3.status === "login") {
      const checkAccInterval = () =>
        setInterval(async () => {
          if (
            (await web3Instance.getAvailableAddress())[0] !==
            newValue.contract.address
          ) {
            store.dispatch(ActionsName.contract.setupAddress);
          }
        }, 2000);
      tempInterval = checkAccInterval();
    } else if (newValue.web3.status === "logout") {
      if (tempInterval !== null) {
        clearInterval(tempInterval);
      }
    }
  });
};

export { web3Instance };
