import { MutationTree } from "vuex";
import { SettingsMutationName } from "./names";
import { SettingsState } from "./state";

const mutations: MutationTree<SettingsState> = {
  // Mutations to toggle darkMode
  [SettingsMutationName.toggleDarkMode](state) {
    state.darkMode = !state.darkMode;
  },
  // Mutations to set darkMode
  [SettingsMutationName.setDarkMode](state, darkMode: boolean) {
    state.darkMode = darkMode;
  },
  [SettingsMutationName.setDeferredPrompt](state, installBanner: boolean) {
    state.installBanner = installBanner;
  }
};

export default mutations;
