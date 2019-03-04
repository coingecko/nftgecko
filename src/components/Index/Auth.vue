<template>
  <div class="row justify-center q-pt-lg">
    <q-card
      class="col-xs-12 col-sm-10 col-md-8 col-lg-6 q-pa-lg"
      v-dm-class="{ dark: 'bg-grey-9', light: 'bg-green-1' }"
    >
      <div class="q-pb-md">
        <current-address />
      </div>
      <div class="col" :key="compKey" v-if="showAddress">
        <q-table
          class="NFT__Table"
          v-dm-class="{ dark: 'bg-grey-9', light: 'bg-green-1' }"
          :key="compKey"
          title="NFTs"
          :data="contractDetails(networkName)"
          :columns="contractColumns"
          row-key="name"
          :loading="loading"
          :dark="darkMode"
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { ActionsName, GettersName } from "src/store";
import { mapActions, mapGetters } from "vuex";
import { generateImageHolder } from "src/helper/utils";
import { darkModeClassDirectives } from "src/directives/darkModeClass";

Vue.component(
  "current-address",
  // The `import` function returns a Promise.
  () => import("src/components/Shared/CurrentAddress.vue")
);

@Component({
  name: "AuthComponent",
  directives: {
    "dm-class": darkModeClassDirectives
  },
  computed: {
    ...mapGetters({
      loading: GettersName.contract.getLoading,
      contractDetails: GettersName.contract.getContractDetails,
      currentAddress: GettersName.contract.getCurrentAddress,
      networkName: GettersName.web3.web3NetworkName,
      compKey: GettersName.contract.getCompKey,
      darkMode: GettersName.settings.getDarkMode
    })
  },
  methods: {
    ...mapActions({
      loadAllContracts: ActionsName.contract.loadAllContracts
    })
  }
})
class AuthComponent extends Vue {
  // data
  public contractColumns = [
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
  ];
  public showAddress = false;

  // vuex
  public networkName: string;
  public loadAllContracts: (network: string) => void;

  // methods
  public generateImageHolder = generateImageHolder;

  public rowClick(val: any) {
    this.$router.push({ path: `/nft/${this.networkName}/${val.name}` });
  }

  async mounted() {
    this.showAddress = false;
    await this.loadAllContracts(this.networkName);
    this.showAddress = true;
  }
}

export default AuthComponent;
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
