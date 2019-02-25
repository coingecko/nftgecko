<template>
  <q-page padding>
    <q-inner-loading :showing="loading" v-if="loading">
      <q-spinner-gears size="90px" color="primary" />
      <p class="Loading__Text">{{ message }}</p>
    </q-inner-loading>
    <available-nft-component
      v-else
      :eth-network="ethNetwork"
      :id="compKey"
      :key="compKey"
    />
  </q-page>
</template>

<script>
import Vue from "vue";
import { W3iMixin } from "src/mixins/W3iMixin";

Vue.component("available-nft-component", () =>
  import("src/components/Shared/AvailableNFT.vue")
);

export default {
  name: "AvailableNFT",
  mixins: [W3iMixin],
  async created() {
    await this.w3i();
    await this.networkCheck();
  }
};
</script>
