import getters from "src/store/settings/getters";
import { SettingsGetterName } from "src/store/settings/names";
import { SettingsState } from "src/store/settings/state";

describe("[Settings Getters]", () => {
  const state: SettingsState = { darkMode: false, installBanner: false };

  it("[Getters] getDarkMode", () => {
    expect(
      getters[SettingsGetterName.getDarkMode](state, {}, {} as any, {})
    ).toBe(state.darkMode);
  });

  it("[Getters] getDeferredPrompt", () => {
    expect(getters[SettingsGetterName.getDeferredPrompt](state, {}, {} as any, {})).toBe(false);
  });

});
