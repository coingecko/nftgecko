<template>
  <q-page padding>
    <available-nft-component />
  </q-page>
</template>

<script>
import Vue from "vue";

Vue.component("available-nft-component", () =>
  import("src/components/Shared/AvailableNFT.vue")
);

export default {
  name: "AvailableNFT"
};
</script>
