<template>
  <q-page padding>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <div class="q-pa-xs" v-show="!loading" v-if="!loading">
      <q-layout
        view="lHh lpr lFf"
        container
        style="height: 85vh"
        class="shadow-2 rounded-borders"
      >
        <q-header elevated class="bg-info">
          <q-toolbar>
            <q-avatar>
              <img :src="jsonData.image.thumb" :alt="jsonData.name" />
            </q-avatar>
            <q-toolbar-title>
              {{ jsonData.name }}
            </q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <q-card class="q-my-md">
              <q-card-section class="row">
                <div
                  class="col col-12 q-px-md q-py-sm row justify-start items-center"
                >
                  <img
                    class="Contract__Image q-mx-sm"
                    :src="jsonData.image.small"
                    :alt="jsonData.name"
                  />
                  <div class="column justify-start">
                    <span class="text-h4">{{ jsonData.name }}</span>
                    <div class="q-pa-md q-gutter-md">
                      <q-badge color="blue">
                        {{ jsonData.contract.standard }}
                      </q-badge>
                      <q-badge color="purple">
                        <a
                          rel="noreferrer"
                          target="_blank"
                          :href="jsonData.official_site"
                        >
                          official site
                        </a>
                      </q-badge>
                    </div>
                  </div>
                </div>
                <div inline class="col col-12 q-px-md q-py-sm">
                  <span class="text-h5 text-bold">About</span>
                  <p>{{ jsonData.description }}</p>
                </div>
              </q-card-section>
            </q-card>
            <current-address
              v-if="currentAddress !== ''"
              :slug="slug"
              type="nft"
            />
            <nft-list class="q-my-md" v-if="showNftList" :name="slug" />
            <div class="row full-width q-mt-lg bg-grey-2" v-else>
              <div class="col-12 q-pa-lg row">
                <span class="text-h5 text-center col-12">
                  No NFTs available
                </span>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </q-page>
</template>

<script>
import { FILENAME } from "src/contracts/contract";
import { Notify } from "quasar";
import CurrentAddressVue from "src/components/Shared/CurrentAddress.vue";
import NFTListVue from "src/components/NFT/NFTList.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { GettersName, ActionsName, MutationsName } from "src/store";

export default {
  name: "NFTComponent",
  components: {
    "current-address": CurrentAddressVue,
    "nft-list": NFTListVue
  },
  data() {
    return {
      loading: true,
      slug: "",
      jsonData: {},
      showNftList: false
    };
  },
  methods: {
    ...mapActions({
      initializeWeb3: ActionsName.web3.initializeWeb3,
      loadSpecificContract: ActionsName.contract.loadSpecificContract
    }),
    ...mapMutations({
      setName: MutationsName.contract.setName
    })
  },
  computed: {
    ...mapGetters({
      currentAddress: GettersName.contract.getCurrentAddress,
      isInitialized: GettersName.web3.web3Initialize
    })
  },
  async mounted() {
    // Check Route
    this.loading = true;
    if (this.$route.params.slug) {
      this.slug = this.$route.params.slug;
      this.setName(this.slug);
      if (FILENAME.indexOf(this.slug) === -1) {
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

    // fetch json data
    this.jsonData = await import(`src/contracts/contract/${
      this.slug
    }/contract.json`);
    this.loading = false;

    // Load Web3
    if (this.currentAddress === "" && this.isInitialized === false) {
      await this.initializeWeb3();
    }
    await this.loadSpecificContract(this.slug);
    this.showNftList = true;
  }
};
</script>

<style>
.Contract__Image {
  height: 80px;
  width: 80px;
}
</style>
