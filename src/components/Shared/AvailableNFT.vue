<template>
  <div class="q-pa-md full-width">
    <q-card>
      <q-card-section>
        <h2 class="text-h2">Available NFTs</h2>
        <p class="text-subtitle2">
          by
          <a href="https://coingecko.com" rel="noreferrer" target="_blank"
            >CoinGecko</a
          >
        </p>
      </q-card-section>

      <div class="row items-stretch">
        <q-card
          v-for="(c, key) in contractsData"
          :key="key"
          class="col col-xs-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card-section class="column">
            <img :src="c.image.small" class="NFT-Card__Image" :alt="c.name" />
            <h5 class="text-h5">{{ c.name }}</h5>
          </q-card-section>
          <q-separator />
          <p class="text-subtitle2 NFT-Card__Description">
            {{ c.description }}
            <br />
            <a :href="c.official_site" rel="noreferrer" target="_blank">{{
              c.official_site
            }}</a>
          </p>
        </q-card>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ActionsName } from "src/store";
import { mapActions, mapState } from "vuex";

export default {
  name: "AvailableNFTComponent",
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState({
      contractsData: state => state.contract.contractsData
    })
  },
  methods: {
    ...mapActions({
      loadAllJson: ActionsName.contract.loadAllJson
    })
  },
  mounted() {
    this.loadAllJson();
  }
};
</script>

<style>
.NFT-Card__Description {
  padding: 10px;
}
.NFT-Card__Image {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
}
.NFT-Card__Image-Wrapper {
}
</style>
