<template>
  <div class="row justify-center q-pt-lg">
    <q-card
      v-dm-class="{ dark: 'bg-grey-9', light: 'bg-green-1' }"
      class="col col-xs-12 col-sm-10 col-md-8 col-lg-6 q-pa-sm"
    >
      <q-card-section>
        <router-link class="text-h5 text-bold" :to="`/nft/${ethNetwork}`">{{
          formattedTitle
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
                class="card-image"
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
import { darkModeClassDirectives } from "src/directives/darkModeClass";

@Component({
  name: "AvailableNFTComponent",
  directives: {
    "dm-class": darkModeClassDirectives
  },
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
class AvailableNFTComponent extends Vue {
  @Prop(String) ethNetwork: string;

  loadAllJson: (network: string) => void;

  loading = true;
  generateImageHolder = generateImageHolder;

  get formattedTitle() {
    return this.ethNetwork
      .split("_")
      .map(d => d.charAt(0).toUpperCase() + d.substr(1))
      .join(" ");
  }

  async mounted() {
    this.loading = true;
    await this.loadAllJson(this.ethNetwork);
    this.loading = false;
  }
}
export default AvailableNFTComponent;
</script>

<style scoped>
.card-image {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
}
</style>
