// @ts-ignore
import { BootInput } from "../types/boot";
import { dom } from "quasar";
import localforage from "localforage";
import { STORAGE_NAME } from "src/store/store";
import { MutationsName } from "src/store";

const { ready } = dom;

// sync VueX and Router
// leave the export, even if you don't use it
export default async ({ app, router, Vue, store }: BootInput) => {
  ready(async () => {
    const dm = await localforage.getItem(STORAGE_NAME.DARKMODE);
    store.commit(MutationsName.settings.setDarkMode, !!dm);
  });
};
