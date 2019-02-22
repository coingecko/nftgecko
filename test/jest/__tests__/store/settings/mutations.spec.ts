import mutations from "src/store/settings/mutations";
import { SettingsMutationName } from "src/store/settings/names";
import { SettingsState } from "~/src/store/settings/state";

describe("[Settings Mutations]", () => {

  let state: SettingsState;

  beforeAll(() => {
    state = { darkMode: false, installBanner: false };
  });

  it("[Mutations] toggleDarkMode", () => {
    mutations[SettingsMutationName.toggleDarkMode](state, null);
    expect(state.darkMode).toBe(true);
  });

  it("[Mutations] setDarkMode", () => {
    mutations[SettingsMutationName.setDarkMode](state, true);
    expect(state.darkMode).toBe(true);
  });

  it("[Mutations] setInstallBanner", () => {
    mutations[SettingsMutationName.setDeferredPrompt](state, true);
    expect(state.installBanner).toBe(true);
  });
});
