import { sync } from "vuex-router-sync";
import store from "src/store";

// sync VueX and Router
// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  sync(store, router);
};
