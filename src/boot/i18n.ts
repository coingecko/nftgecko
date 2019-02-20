import VueI18n from "vue-i18n";
import messages from "src/i18n";
import { BootInput } from "../types/boot";

let i18n: VueI18n;

export default async ({ app, Vue }: BootInput) => {
  Vue.use(VueI18n);

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: "en-us",
    fallbackLocale: "en-us",
    messages
  });

  i18n = app.i18n;
};

export { i18n };
