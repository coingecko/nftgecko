<template>
  <div class="row q-px-md">
    <q-card class="col col-12">
      <div class="col col-12 q-pb-md">
        <current-address />
      </div>
      <div class="row" :key="compKey">
        <q-table
          :key="compKey"
          title="NFTs"
          :data="contractDetails"
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
            <q-td>
              <span class="">
                <img class="Table__Img float-left" :src="props.row.thumb" />
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
import { ActionsName, GettersName } from "src/store";
import { mapActions, mapState, mapGetters } from "vuex";
import CurrentAddressVue from "src/components/Shared/CurrentAddress.vue";

export default {
  name: "AuthComponent",
  components: {
    "current-address": CurrentAddressVue
  },
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
      ]
    };
  },
  computed: {
    ...mapState({
      compKey: state => state.contract.compKey
    }),
    ...mapGetters({
      loading: GettersName.contract.getLoading,
      contractDetails: GettersName.contract.getContractDetails,
      currentAddress: GettersName.contract.getCurrentAddress
    })
  },
  methods: {
    ...mapActions({
      loadAllContracts: ActionsName.contract.loadAllContracts
    }),
    rowClick(val) {
      this.$router.push({ path: `/nft/${val.name}` });
    }
  },
  mounted() {
    this.loadAllContracts();
  }
};
</script>

<style>
.Table__Img {
  width: 20px;
  height: 20px;
}
</style>
