<template>
  <div class="row q-mt-lg flex justify-center">
    <q-card
      v-dm-class="{ dark: 'bg-grey-9', light: 'bg-green-1' }"
      class="col-xs-12 col-sm-10 col-md-8 col-lg-6 q-pa-lg"
    >
      <div class="q-pa-lg text-center">
        <span class="text-h5">{{ $t("not_auth.connect_to_metamask") }}</span>
        <div class="text-center q-py-lg">
          <a href="https://metamask.io" rel="noreferrer" target="_blank">
            <img
              class="metamask-img"
              src="~/assets/download-metamask.png"
              alt="download metamask"
            />
          </a>
        </div>
        <div class="text-center q-pt-lg">
          <q-btn
            class="q-pa-md"
            size="md"
            icon="fas fa-redo-alt fa-2x"
            :label="$t('not_auth.retry_btn')"
            color="info"
            @click="initializeWeb3"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import { ActionsName } from "src/store";
import { Vue, Component, Prop } from "vue-property-decorator";
import { darkModeClassDirectives } from "src/directives/darkModeClass";

@Component({
  name: "NotAuthComponent",
  directives: {
    "dm-class": darkModeClassDirectives
  },
  methods: {
    ...mapActions({ initializeWeb3: ActionsName.web3.initializeWeb3 })
  }
})
class NotAuthComponent extends Vue {}

export default NotAuthComponent;
</script>

<style scoped>
.metamask-img {
  max-width: 400px;
  width: 100%;
  height: auto;
}
</style>
