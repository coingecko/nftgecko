<template>
  <div class="row justify-center">
    <h1 class="col col-12 text-h2">Landing Page</h1>
    <h4 class="col col-12 text-h4">You are not connected to metamask</h4>
    <q-btn
      class="col col-12"
      icon="refresh"
      label="restart the prompt for metamask"
      color="info"
      @click="initializeWeb3"
    />
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

<style></style>
