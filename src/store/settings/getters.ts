import { GetterTree } from "vuex";
import { SettingsGetterName } from "./names";
import { SettingsState } from "./state";

const getters: GetterTree<SettingsState, any> = {
  // get dark mode
  [SettingsGetterName.getDarkMode](state) {
    return state.darkMode;
  },
  [SettingsGetterName.getDeferredPrompt](state) {
    return state.installBanner;
  }
};

export default getters;
