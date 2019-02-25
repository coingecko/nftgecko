<template>
  <q-page padding>
    <available-nft-component
      class="q-py-sm"
      v-for="f in fileNames"
      :key="f"
      :eth-network="f"
    />
  </q-page>
</template>

<script>
import Vue from "vue";
import { FILE } from "src/contracts/contract";

Vue.component("available-nft-component", () =>
  import("src/components/Shared/AvailableNFT.vue")
);

export default Vue.extend({
  data: function() {
    return {
      fileNames: Object.keys(FILE)
    };
  }
});
</script>
