// import something here

// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  // something to do
  window.addEventListener("beforeinstallprompt", (/** @type {*} */ e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    let deferredPrompt = e;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      window.removeEventListener("beforeinstallprompt", () => {});
    });
  });
};
