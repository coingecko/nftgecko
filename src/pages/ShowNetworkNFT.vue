<template>
  <q-page padding>
    <available-nft-component :eth-network="ethNetwork" />
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
  mixins: [W3iMixin]
};
</script>
