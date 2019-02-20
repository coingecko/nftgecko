import { BootInput } from "../types/boot";

export default async ({ app, router, Vue }: BootInput) => {
  window.addEventListener("beforeinstallprompt", (/** @type {*} */ e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    let deferredPrompt: any = e;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      window.removeEventListener("beforeinstallprompt", () => {});
    });
  });
};
