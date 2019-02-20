<template>
  <div>
    <available-nft />
    <landing />
  </div>
</template>

<script>
import AvailableNFTComponent from "src/components/Shared/AvailableNFT.vue";
import LandingVue from "src/components/Landing/Landing.vue";

export default {
  components: {
    "available-nft": AvailableNFTComponent,
    landing: LandingVue
  }
};
</script>
