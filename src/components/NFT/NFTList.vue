<template>
  <div v-if="exist">
    <div class="col-12 text-h5 text-bold text-center text-white q-my-md">
      # NFTs available: {{ bal }}
    </div>
    <div class="row col-12" v-if="bal > 0">
      <div
        class="col-xs-12 col-sm-6 col-md-3 col-lg-2 flex justify-center"
        v-for="nft in nftIds"
        :key="nft.id"
      >
        <nft-img :src="nft.image" :alt="nft.id" />
      </div>
    </div>
    <div class="row q-mt-lg bg-grey-2" v-else>
      <div class="col-12 q-pa-lg row">
        <span class="text-h5 text-center col-12">
          No NFTs available
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { GettersName } from "src/store";
import { mapGetters, mapState } from "vuex";
import NFTImageVue from "src/components/NFT/NFTImage.vue";
export default {
  props: { name: { type: String, default: "" } },
  components: {
    "nft-img": NFTImageVue
  },
  computed: {
    ...mapState({
      nftIds: function(state) {
        return state.contract.contractDetails[this.name].ids;
      }
    }),
    ...mapGetters({
      contractDetails: GettersName.contract.getContractDetails
    }),
    exist() {
      return this.contractDetails.length > 0;
    },
    bal() {
      return this.contractDetails.filter(data => data.name === this.name)[0]
        .balance;
    }
  }
};
</script>
