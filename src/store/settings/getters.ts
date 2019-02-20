import { GetterTree } from "vuex";
import { SettingsGetterName } from "./names";
import { SettingsState } from "./state";

const getters: GetterTree<SettingsState, any> = {
  // get dark mode
  [SettingsGetterName.getDarkMode](state) {
    return state.darkMode;
  }
};

export default getters;
