import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import contract from "./contract";
import settings from "./settings";
import web3 from "./web3";
import {
  ContractActionName,
  ContractGetterName,
  ContractMutationName
} from "./contract/names";
import {
  SettingsActionName,
  SettingsMutationName,
  SettingsGetterName
} from "./settings/names";
import { nameFactory } from "src/helper/utils";
import { Web3ActionName, Web3MutationName, Web3GetterName } from "./web3/names";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    web3,
    contract
  },
  plugins: process.env.DEV ? [createLogger()] : []
});

export const ActionsName = {
  /** @type {import("./contract/names").ContractActionName} */
  contract: nameFactory("contract", ContractActionName),
  /** @type {import("./settings/names").SettingsActionName} */
  settings: nameFactory("settings", SettingsActionName),
  /** @type {import("./web3/names").Web3ActionName} */
  web3: nameFactory("web3", Web3ActionName)
};

export const MutationsName = {
  /** @type {import("./contract/names").ContractMutationName} */
  contract: nameFactory("contract", ContractMutationName),
  /** @type {import("./settings/names").SettingsMutationName} */
  settings: nameFactory("settings", SettingsMutationName),
  /** @type {import("./web3/names").Web3MutationName} */
  web3: nameFactory("web3", Web3MutationName)
};

export const GettersName = {
  /** @type {import("./contract/names").ContractGetterName} */
  contract: nameFactory("contract", ContractGetterName),
  /** @type {import("./settings/names").SettingsGetterName} */
  settings: nameFactory("settings", SettingsGetterName),
  /** @type {import("./web3/names").Web3GetterName} */
  web3: nameFactory("web3", Web3GetterName)
};
