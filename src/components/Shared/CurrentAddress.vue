<template>
  <q-card>
    <q-card-section :v-if="currentAddress > 1">
      <q-input
        class
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

<script lang="ts">
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionsName, MutationsName, GettersName } from "src/store";
import { generateImageHolder } from "src/helper/utils";
import { Prop, Component, Vue } from "vue-property-decorator";

@Component({
  name: "CurrentAdressComponent",
  computed: {
    ...mapGetters({
      currentAddress: GettersName.contract.getCurrentAddress,
      network: GettersName.web3.web3NetworkName
    })
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
    })
  }
})
class CurrentAddress extends Vue {
  @Prop(String) slug: string;
  @Prop(String) type: string;

  setAddress: (addr: string) => void;
  setLoading: (loading: boolean) => void;
  updateBalance: () => void;
  loadSpecificContract: (payload: { name: string; network: string }) => void;
  currentAddress: string;
  network: string;

  async handleAddressChange(e: { target: HTMLInputElement }) {
    const val = e.target.value.trim();
    this.setAddress(val);
    this.setLoading(true);
    await this.updateBalance();
    if (this.type === "nft") {
      await this.loadSpecificContract({
        name: this.slug,
        network: this.network
      });
    }
    this.setLoading(false);
  }

  get identicon(): string {
    return generateImageHolder(`${this.currentAddress}`, 50);
  }
}
export default CurrentAddress;
</script>

<style></style>
