import { BootInput } from "src/types/boot";
import { dom } from "quasar";

const { ready } = dom;

// leave the export, even if you don't use it
export default async ({ app, router, Vue }: BootInput) => {
  // something to do
  ready(() => {
    // @ts-ignore
    window.loading_screen.finish();
  });
};
