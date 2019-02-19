import mutations from "src/store/settings/mutations";
import { SettingsMutationName } from "src/store/settings/names";

describe("[Settings Mutations]", () => {
  it("[Mutations] toggleDarkMode", () => {
    const state = { darkMode: false };
    mutations[SettingsMutationName.toggleDarkMode](state, null);
    expect(state.darkMode).toBe(true);
  });

  it("[Mutations] setDarkMode", () => {
    const state = { darkMode: false };
    mutations[SettingsMutationName.setDarkMode](state, true);
    expect(state.darkMode).toBe(true);
  });
});
