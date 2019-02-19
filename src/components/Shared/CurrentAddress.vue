<template>
  <q-card>
    <q-card-section v-if="currentAddress !== ''">
      <span class="text-h2">Current Address</span>
      <q-input
        class=""
        type="text"
        label="ethereum address"
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
import Identicon from "identicon.js";

export default Vue.extend({
  name: "CurrentAdressComponent",
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      updateBalance: ActionsName.contract.updateBalance,
      initializeWeb3: ActionsName.web3.initializeWeb3,
      loadAllContracts: ActionsName.contract.loadAllContracts
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
      this.setLoading(false);
    }
  },
  computed: {
    ...mapGetters({
      currentAddress: GettersName.contract.getCurrentAddress
    }),
    identicon() {
      const identicon = new Identicon(this.currentAddress, 50).toString();
      return `data:image/png;base64,${identicon}`;
    }
  },
  async mounted() {}
});
</script>

<style></style>
