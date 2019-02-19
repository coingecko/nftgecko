import { SettingsMutationName } from "./names";

/** @typedef {import("./state").default} SettingsState */

/** @type {import("vuex").MutationTree<SettingsState>} */
const mutations = {
  // Mutations to toggle darkMode
  [SettingsMutationName.toggleDarkMode](state) {
    state.darkMode = !state.darkMode;
  },
  // Mutations to set darkMode
  [SettingsMutationName.setDarkMode](state, /** @type {boolean} */ darkMode) {
    state.darkMode = darkMode;
  }
};

export default mutations;
