<template>
  <q-card>
    <q-card-section v-if="currentAddress !== ''">
      <q-input
        class=""
        type="text"
        label="Address"
        max-height="100"
        @change="handleAddressChange"
        :value="currentAddress"
        filled
        standout
        bottom-slots
      >
        <template v-slot:before>
          <q-avatar>
            <img class="q-mx-sm" :src="identicon" :alt="currentAddress" />
          </q-avatar>
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionsName, MutationsName, GettersName } from "src/store";
import { generateImageHolder } from "src/helper/utils";

export default Vue.extend({
  name: "CurrentAdressComponent",
  props: {
    slug: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "index"
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      updateBalance: ActionsName.contract.updateBalance,
      initializeWeb3: ActionsName.web3.initializeWeb3,
      loadAllContracts: ActionsName.contract.loadAllContracts,
      loadSpecificContract: ActionsName.contract.loadSpecificContract
    }),
    ...mapMutations({
      setAddress: MutationsName.contract.setAddress,
      setLoading: MutationsName.contract.setLoading
    }),
    async handleAddressChange(e) {
      const val = e.target.value.trim();
      this.setAddress(val);
      this.setLoading(true);
      await this.updateBalance();
      if (this.type === "nft") {
        await this.loadSpecificContract(this.slug);
      }
      this.setLoading(false);
    }
  },
  computed: {
    ...mapGetters({
      currentAddress: GettersName.contract.getCurrentAddress
    }),
    identicon() {
      return generateImageHolder(this.currentAddress, 50);
    }
  },
  async mounted() {}
});
</script>

<style></style>
