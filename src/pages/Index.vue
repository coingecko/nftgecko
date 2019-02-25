<template>
  <q-page padding>
    <q-inner-loading :showing="loading" v-if="loading">
      <q-spinner-gears size="90px" color="primary" />
      <p class="Loading__Text">{{ message }}</p>
    </q-inner-loading>
    <auth-component v-else-if="auth" />
    <not-auth-component v-else />
  </q-page>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { GettersName } from "src/store";
import { W3iMixin } from "src/mixins/W3iMixin";

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
  mixins: [W3iMixin],
  computed: {
    ...mapGetters({
      status: GettersName.web3.web3Status
    })
  }
});
</script>

<style>
.Loading__Text {
  padding-top: 10px;
}
</style>
