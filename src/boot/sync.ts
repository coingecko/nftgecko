import { sync } from "vuex-router-sync";
import { BootInput } from "../types/boot";

// sync VueX and Router
export default async ({ app, router, Vue, store }: BootInput) => {
  sync(store, router);
};
