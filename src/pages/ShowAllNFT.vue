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

<script lang="ts">
import { FILE } from "src/contracts/contract";
import { Component, Vue } from "vue-property-decorator";

Vue.component("available-nft-component", () =>
  import("src/components/Shared/AvailableNFT.vue")
);

@Component({
  name: "ShowAllNFTPage"
})
class ShowAllNFTPage extends Vue {
  public fileNames = Object.keys(FILE);
}

export default ShowAllNFTPage;
</script>
