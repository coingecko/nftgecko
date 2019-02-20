import { sync } from "vuex-router-sync";
// @ts-ignore
import store from "src/store";
import { BootInput } from "../types/boot";
// import { BootInput } from "../types/boot";

// sync VueX and Router
// leave the export, even if you don't use it
export default async ({ app, router, Vue }: BootInput) => {
  sync(store, router);
};
