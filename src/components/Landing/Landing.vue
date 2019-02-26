<template>
  <div class="row q-px-md q-mt-lg d-flex justify-center">
    <q-card class="col col-3">
      <div class="col col-12 q-pa-lg text-center">
        <div class="text-center q-pt-lg">
          <a href="https://metamask.io" rel="noreferrer" target="_blank">
            <img
              class="Metamask__Img"
              src="~/assets/download-metamask.png"
              style="height: 50px; width: auto;"
              alt="download metamask"
            />
          </a>
        </div>
        <div class="text-h7 q-pb-lg">Connect with MetaMask to get started</div>
        <div class="text-center">
          <q-btn
            class="q-pa-md"
            size="sm"
            icon="fas fa-redo-alt"
            label="Retry Web3 Prompt"
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

export default {
  name: "LandingComponent",
  methods: {
    ...mapActions({ initializeWeb3: ActionsName.web3.initializeWeb3 })
  },
  data() {
    return {};
  }
};
</script>

<style>
.Metamask__Img {
  max-width: 400px;
  width: 100%;
}
</style>
