import Vue from "vue";
import VueRouter from "vue-router";
import { Store } from "vuex";
import { RootState } from "src/store";

export interface BootInput {
  app: any;
  router: VueRouter;
  Vue: typeof Vue;
  store: Store<RootState>;
  ssrContext: any;
}
