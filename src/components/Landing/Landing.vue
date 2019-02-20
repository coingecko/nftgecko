<template>
  <div class="q-pa-md">
    <q-card class="row justify-center q-py-lg">
      <span class="col col-12 text-h4 text-bold text-center"
        >You are not connected to metamask</span
      >
      <div class="col col-12 text-center q-py-lg">
        <a href="https://metamask.io" rel="noreferrer" target="_blank">
          <img
            class="Metamask__Img"
            src="~/assets/download-metamask.png"
            alt="download metamask"
          />
        </a>
      </div>
      <div class="col col-12 text-center">
        <q-btn
          class="q-pa-md"
          icon="fas fa-redo-alt"
          label="restart prompt for web3"
          color="info"
          @click="initializeWeb3"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
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
