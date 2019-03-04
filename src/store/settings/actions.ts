import localforage from "localforage";

import { SettingsActionName, SettingsMutationName } from "./names";
import { STORAGE_NAME } from "../store";
import { ActionTree } from "vuex";
import { RootState } from "..";
import { SettingsState } from "./state";

const actions: ActionTree<SettingsState, RootState> = {
  async [SettingsActionName.storeDarkMode]({ state, commit }, dm: boolean) {
    const val = await localforage.setItem(STORAGE_NAME.DARKMODE, dm);
    commit(SettingsMutationName.setDarkMode, val);
  }
};

export default actions;
