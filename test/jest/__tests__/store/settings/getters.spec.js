import getters from "src/store/settings/getters";
import { SettingsGetterName } from "src/store/settings/names";

describe("[Settings Getters]", () => {
  it("[Getters] getDarkMode", () => {
    const state = { darkMode: false };
    expect(getters[SettingsGetterName.getDarkMode](state)).toBe(state.darkMode);
  });
});
