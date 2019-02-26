<template>
  <div class="row justify-center q-pt-lg">
    <q-card class="col col-6">
      <q-card-section>
        <router-link class="text-h5" :to="`/nft/${ethNetwork}`">{{
          ethNetwork
        }}</router-link>
      </q-card-section>
      <q-list>
        <q-item
          v-for="(c, key) in contractsData[ethNetwork]"
          :key="key"
          :to="`/nft/${ethNetwork}/${c.slug}`"
        >
          <q-item-section avatar>
            <q-avatar square>
              <img
                :src="
                  c.image.large ||
                    generateImageHolder(c.contract.contract_address, 300)
                "
                class="NFT-Card__Image"
                :alt="c.name"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ c.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script lang="ts">
import { ActionsName, RootState } from "src/store";
import { mapActions, mapState } from "vuex";
import { generateImageHolder } from "src/helper/utils";
import { Prop, Component, Vue } from "vue-property-decorator";

@Component({
  name: "AvailableNFTComponent",
  computed: {
    ...mapState({
      contractsData: (state: RootState) => state.contract.contractsData
    })
  },
  methods: {
    ...mapActions({
      loadAllJson: ActionsName.contract.loadAllJson
    })
  }
})
class AvailableNFT extends Vue {
  @Prop(String) ethNetwork: string;

  loadAllJson: (network: string) => void;

  loading = true;
  generateImageHolder = generateImageHolder;

  async mounted() {
    this.loading = true;
    await this.loadAllJson(this.ethNetwork);
    this.loading = false;
  }
}
export default AvailableNFT;
</script>

<style>
.NFT-Card__Description {
  padding: 10px;
}
.NFT-Card__Image {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
}
.NFT-Card__Image-Wrapper {
}
</style>
