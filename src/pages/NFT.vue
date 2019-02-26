<template>
  <q-page class="flex flex-center" padding>
    <q-inner-loading :showing="showLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <div class="q-pa-xs" v-show="!showLoading" v-if="!showLoading">
      <q-card class="q-my-md">
        <q-card-section class="">
          <div class="row">
            <img
              class="Contract__Image q-mx-sm"
              :src="
                jsonData.image.small ||
                  generateImageHolder(jsonData.contract.contract_address, 100)
              "
              :alt="jsonData.name"
            />
            <div class="column justify-start column inline q-ml-sm">
              <span class="text-h5">{{ jsonData.name }}</span>
              <div>
                <q-badge color="blue">
                  {{ jsonData.contract.standard }}
                </q-badge>
                <a
                  rel="noreferrer"
                  target="_blank"
                  :href="jsonData.official_site"
                >
                  official site
                </a>
              </div>
            </div>
          </div>

          <div class="col col-12 q-px-md q-py-sm">
            <current-address
              v-if="currentAddress !== ''"
              :slug="slug"
              type="nft"
            />
          </div>
        </q-card-section>
      </q-card>

      <nft-list
        class="q-my-md"
        v-if="showNftList"
        :name="slug"
        :network="ethNetwork"
      />
      <div class="row full-width q-mt-lg bg-grey-2" v-else>
        <div class="col-12 q-pa-lg row">
          <span class="text-h5 text-center col-12">
            No NFTs available 2
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { FILE, SUPPORTED_NETWORK } from "src/contracts/contract";
import { Notify } from "quasar";
import CurrentAddressVue from "src/components/Shared/CurrentAddress.vue";
import NFTListVue from "src/components/NFT/NFTList.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { GettersName, ActionsName, MutationsName } from "src/store";
import { generateImageHolder } from "src/helper/utils";
import { W3iMixin } from "src/mixins/W3iMixin";
import Component, { mixins } from "vue-class-component";

@Component({
  name: "NFTComponent",
  components: {
    "current-address": CurrentAddressVue,
    "nft-list": NFTListVue
  },
  methods: {
    ...mapActions({
      loadSpecificContract: ActionsName.contract.loadSpecificContract
    }),
    ...mapMutations({
      setName: MutationsName.contract.setName
    }),
    generateImageHolder: generateImageHolder
  },
  computed: {
    ...mapGetters({
      currentAddress: GettersName.contract.getCurrentAddress,
      network: GettersName.web3.web3NetworkName,
      isInitialized: GettersName.web3.web3Initialize
    })
  }
})
class NFTComponent extends mixins(W3iMixin) {
  // Data
  slug = "";
  jsonData = {};
  showNftList = false;
  showLoading = true;

  // Vuex
  network: string;
  setName: (name: string) => void;
  loadSpecificContract: (payload: { name: string; network: string }) => void;

  async mounted() {
    this.showLoading = true;
    await this.w3i();
    await this.networkCheck();
    const network = this.network || this.$route.params.network;
    // Check Route
    if (this.$route.params.slug) {
      this.slug = this.$route.params.slug;
      this.setName(this.slug);
      if (!SUPPORTED_NETWORK.hasOwnProperty(network)) {
        this.$router.push({ path: "/nft" });
        Notify.create({
          color: "red",
          message: `Network not supported for id ${this.network}`
        });
        return;
      }
      if (FILE[network].filename.indexOf(this.slug) === -1) {
        this.$router.push({ path: "/nft" });
        Notify.create({
          color: "red",
          message: `No contract found for ${this.slug}`
        });
        return;
      }
    } else {
      Notify.create({
        color: "red",
        message: `No slug found`
      });
      this.$router.push({ path: "/" });
      return;
    }
    this.showLoading = false;
    // fetch json data
    this.jsonData = await import(`src/contracts/contract/${network}/${
      this.slug
    }/contract.json`);
    await this.loadSpecificContract({ name: this.slug, network });
    this.showNftList = true;
  }
}

export default NFTComponent;
</script>

<style>
.Contract__Image {
  height: 60px;
  width: 60px;
}
</style>
