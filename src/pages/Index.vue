<template>
  <q-inner-loading :showing="loading" v-if="loading">
    <q-spinner-gears size="90px" color="primary" />
    <p class="Loading__Text">{{ message }}</p>
  </q-inner-loading>
  <auth-component v-else-if="status === 'login'" />
  <not-auth-component v-else />
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { ActionsName, GettersName } from "src/store";

Vue.component(
  "auth-component",
  // The `import` function returns a Promise.
  () => import("src/components/Index/Auth.vue")
);
Vue.component(
  "not-auth-component",
  // The `import` function returns a Promise.
  () => import("src/components/Index/NotAuth.vue")
);

export default Vue.extend({
  name: "PageIndex",
  computed: {
    ...mapGetters({
      loading: GettersName.web3.web3Loading,
      message: GettersName.web3.web3LoadingMessage,
      status: GettersName.web3.web3Status,
      isInitialized: GettersName.web3.web3Initialize
    })
  },
  methods: {
    ...mapActions({ initializeWeb3: ActionsName.web3.initializeWeb3 })
  },
  mounted() {
    if (!this.isInitialized) {
      this.initializeWeb3();
    }
  }
});
</script>

<style>
.Loading__Text {
  padding-top: 10px;
}
</style>
