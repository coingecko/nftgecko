<template>
  <q-page padding>
    <div class="row">
      <div class="col col-12">
        <h2 class="text-h2">Settings</h2>
      </div>
      <div class="col col-12" v-if="deferredPrompt">
        <h5 class="text-h5" @click="addToHomeScreen">Add To Homescreen</h5>
        <q-btn icon="home" label="`Add App To Home Screen`" color="info" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "SettingsPage",
  data() {
    return {
      deferredPrompt: null
    };
  },
  methods: {
    addToHomeScreen: function() {
      this.deferredPrompt.install();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
      });
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  mounted() {
    // testing
    // const event = new Event("beforeinstallprompt");
    // window.dispatchEvent(event);
  },
  destroyed() {
    window.removeEventListener("beforeinstallprompt", () => {});
  }
});
</script>

<style></style>
