<template>
  <q-page padding>
    <q-inner-loading :showing="loading" v-if="loading">
      <q-spinner-gears size="90px" color="primary" />
      <p class="Loading__Text">{{ message }}</p>
    </q-inner-loading>
    <auth-component v-else-if="auth && loginStatus !== 'logout'" />
    <not-auth-component v-else />
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { GettersName } from "src/store";
import { W3iMixin } from "src/mixins/W3iMixin";
import { Component, Vue, Mixins } from "vue-property-decorator";

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

@Component({
  name: "PageIndex",
  computed: {
    ...mapGetters({
      status: GettersName.web3.web3Status
    })
  }
})
class IndexPage extends Mixins(W3iMixin) {
  async created() {
    await this.w3i();
    await this.networkCheck();
  }
}

export default IndexPage;
</script>

<style>
.Loading__Text {
  padding-top: 10px;
}
</style>
