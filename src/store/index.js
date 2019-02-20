import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import VuexStoreProperties, {
  ActionsName,
  GettersName,
  MutationsName
} from "./indexts";

export default new Vuex.Store(VuexStoreProperties);

export { ActionsName, GettersName, MutationsName };
