<template>
  <div>
    <landing />
    <!-- <available-nft /> -->
  </div>
</template>

<script lang="ts">
// import AvailableNFTComponent from "src/components/Shared/AvailableNFT.vue";
import LandingVue from "src/components/Landing/Landing.vue";

export default {
  components: {
    // "available-nft": AvailableNFTComponent,
    landing: LandingVue
  }
};
</script>
