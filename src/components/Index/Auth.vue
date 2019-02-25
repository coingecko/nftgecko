<template>
  <div class="row justify-center q-pt-lg">
    <q-card class="">
      <div class="col col-6 q-pb-md">
        <current-address />
      </div>
      <div class="row" :key="compKey" v-if="showAddress">
        <q-table
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
              <span class>
                <img
                  class="Table__Img float-left"
                  :src="
                    props.row.thumb || generateImageHolder(props.row.address)
                  "
                />
                <span class="q-ml-md column inline">{{ props.row.name }}</span>
              </span>
            </q-td>
            <q-td class="text-right">
              <span>{{ props.row.balance }} XYZ</span>
            </q-td>
          </q-tr>
        </q-table>
      </div>
    </q-card>
  </div>
</template>

<script>
import Vue from "vue";
import { ActionsName, GettersName } from "src/store";
import { mapActions, mapState, mapGetters } from "vuex";
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
    ...mapState({
      compKey: state => state.contract.compKey
    }),
    ...mapGetters({
      loading: GettersName.contract.getLoading,
      contractDetails: GettersName.contract.getContractDetails,
      currentAddress: GettersName.contract.getCurrentAddress,
      networkName: GettersName.web3.web3NetworkName
    })
  },
  methods: {
    ...mapActions({
      loadAllContracts: ActionsName.contract.loadAllContracts
    }),
    rowClick(val) {
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
  width: 20px;
  height: 20px;
}
</style>
