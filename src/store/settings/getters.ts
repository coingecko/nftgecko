import { GetterTree } from "vuex";
import { RootState } from "../indexts";
import { SettingsGetterName } from "./names";
import { SettingsState } from "./state";

const getters: GetterTree<SettingsState, RootState> = {
  // get dark mode
  [SettingsGetterName.getDarkMode](state) {
    return state.darkMode;
  },
  [SettingsGetterName.getDeferredPrompt](state) {
    return state.installBanner;
  }
};

export default getters;
