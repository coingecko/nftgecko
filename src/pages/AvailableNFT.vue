<template>
  <available-nft-component />
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
