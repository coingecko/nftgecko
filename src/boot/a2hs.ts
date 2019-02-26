// @ts-ignore
import store from "src/store";
import { MutationsName } from "../store";
import { BootInput } from "../types/boot";

export default async ({ app, router, Vue }: BootInput) => {
  window.addEventListener("beforeinstallprompt", (e: any) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = e;
    store.commit(MutationsName.settings.setDeferredPrompt, true);
  });
};
