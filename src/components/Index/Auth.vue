<template>
  <div class="row justify-center q-pt-lg">
    <q-card class="col-xs-12 col-sm-10 col-md-8 col-lg-6 q-pa-lg bg-grey-3">
      <div class="q-pb-md">
        <current-address />
      </div>
      <div class="col" :key="compKey" v-if="showAddress">
        <q-table
          class="NFT__Table"
          :key="compKey"
          title="NFTs"
          :data="contractDetails(networkName)"
          :columns="contractColumns"
          row-key="name"
          :loading="loading"
        >
          <q-tr
            slot="body"
            slot-scope="props"
            :props="props"
            @click.native="rowClick(props.row)"
            class="cursor-pointer"
          >
            <q-td class="text-center" key="thumb" :props="props">
              <img
                class="Table__Img"
                :src="props.row.thumb || generateImageHolder(props.row.address)"
              />
            </q-td>
            <q-td>
              <div class="text-subtitle1 flex items-center">
                <img
                  class="Table__Img float-left"
                  :src="
                    props.row.thumb || generateImageHolder(props.row.address)
                  "
                />
                <span class="q-ml-md column inline">{{ props.row.name }}</span>
              </div>
            </q-td>
            <q-td class="text-right">
              <span class="text-subtitle1"
                >{{ props.row.balance }} {{ props.row.symbol }}</span
              >
            </q-td>
          </q-tr>
        </q-table>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionsName, GettersName } from "src/store";
import { mapActions, mapGetters } from "vuex";
import { generateImageHolder } from "src/helper/utils";

Vue.component(
  "current-address",
  // The `import` function returns a Promise.
  () => import("src/components/Shared/CurrentAddress.vue")
);

export default Vue.extend({
  name: "AuthComponent",
  data() {
    return {
      contractColumns: [
        {
          name: "name",
          required: true,
          label: "Asset",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "balance",
          required: true,
          label: "Balance",
          align: "right",
          field: "balance",
          sortable: true
        }
      ],
      showAddress: false
    };
  },
  computed: {
    ...mapGetters({
      loading: GettersName.contract.getLoading,
      contractDetails: GettersName.contract.getContractDetails,
      currentAddress: GettersName.contract.getCurrentAddress,
      networkName: GettersName.web3.web3NetworkName,
      compKey: GettersName.contract.getCompKey
    })
  },
  methods: {
    ...mapActions({
      loadAllContracts: ActionsName.contract.loadAllContracts
    }),
    rowClick(val: any) {
      this.$router.push({ path: `/nft/${this.networkName}/${val.name}` });
    },
    generateImageHolder: generateImageHolder
  },
  async mounted() {
    this.showAddress = false;
    await this.loadAllContracts(this.networkName);
    this.showAddress = true;
  }
});
</script>

<style>
.Table__Img {
  width: 40px;
  height: 40px;
}

.NFT__Table > .q-table__top > .q-table__control > .q-table__title {
  padding-top: 10px;
  font-size: 28px;
}

.NFT__Table > .q-table__middle.scroll > table > thead > tr > th.sortable {
  font-size: 17px;
}
</style>
