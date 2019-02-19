<template>
  <div class="row full-width q-px-md">
    <div class="col col-12 q-pb-md">
      <current-address />
    </div>
    <q-card class="col col-12">
      <div class="row" :key="compKey">
        <q-table
          :key="compKey"
          class="full-width"
          title="Available NFTs"
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
            <q-td class="text-center" key="thumb" :props="props">
              <img class="Table__Img" :src="props.row.thumb" />
            </q-td>
            <q-td>
              {{ props.row.name }}
            </q-td>
            <q-td class="text-right">
              {{ props.row.balance }}
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
          name: "thumb",
          required: true,
          label: "Thumb Image",
          align: "center",
          field: "thumb",
          style: "width: 40px;"
        },
        {
          name: "name",
          required: true,
          label: "Contract Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "balance",
          required: true,
          label: "NFTs Availables",
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
  width: 40px;
  height: 40px;
}
</style>
