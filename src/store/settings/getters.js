import { SettingsGetterName } from "./names";

/** @typedef {import("./state").default} SettingsState */

/**
 * @type {*}
 */
const getters = {
  // get dark mode
  [SettingsGetterName.getDarkMode](state) {
    return state.darkMode;
  }
};

export default getters;
