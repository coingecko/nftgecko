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

<script lang="ts">
import { W3iMixin } from "src/mixins/W3iMixin";
import { Component, Vue, Mixins } from "vue-property-decorator";

Vue.component("available-nft-component", () =>
  import("src/components/Shared/AvailableNFT.vue")
);

@Component({
  name: "ShowNetworkNFTPage"
})
class ShowNetworkNFTPage extends Mixins(W3iMixin) {
  async created() {
    await this.w3i();
    await this.networkCheck();
  }
}

export default ShowNetworkNFTPage;
</script>
