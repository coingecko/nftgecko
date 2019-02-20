<template>
  <div class="q-pa-md full-width">
    <q-card>
      <q-card-section>
        <span class="text-h2">Available NFTs</span>
        <p class="text-subtitle2">
          by
          <a
            class="Link__Default"
            href="https://coingecko.com"
            rel="noreferrer"
            target="_blank"
            >CoinGecko</a
          >
        </p>
      </q-card-section>

      <div class="row items-stretch justify-center">
        <div
          v-for="(c, key) in contractsData"
          :key="key"
          class="col col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm"
        >
          <q-card class="full-width full-height">
            <q-card-section class="column">
              <router-link class="NFT-Card__Image" :to="`/nft/${c.slug}`">
                <img
                  :src="
                    c.image.large ||
                      generateImageHolder(c.contract.contract_address, 300)
                  "
                  class="NFT-Card__Image"
                  :alt="c.name"
                />
              </router-link>
              <router-link
                :to="`/nft/${c.slug}`"
                class="q-py-sm text-h5 text-bold text-center Link__Default"
                >{{ c.name }}</router-link
              >
            </q-card-section>
            <q-separator />
            <p class="text-subtitle2 NFT-Card__Description">
              {{ c.description }}
              <br />
              <a
                class="Link__Default"
                :href="c.official_site"
                rel="noreferrer"
                target="_blank"
                >{{ c.official_site }}</a
              >
            </p>
          </q-card>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ActionsName } from "src/store";
import { mapActions, mapState } from "vuex";
import { generateImageHolder } from "src/helper/utils";

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
    }),
    generateImageHolder: generateImageHolder
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
