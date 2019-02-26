<template>
  <q-page padding>
    <q-card>
      <div class="row q-px-md">
        <div class="col col-12 q-py-sm">
          <span class="text-h2">Settings</span>
        </div>
        <div class="col col-12 q-py-sm" v-if="deferredPrompt">
          <span class="text-h5">Add To Homescreen</span>
          <br />
          <q-btn
            @click="addToHomeScreen"
            icon="fas fa-home"
            label="Add App To Home Screen"
            color="info"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { GettersName } from "src/store";
export default Vue.extend({
  name: "SettingsPage",
  computed: {
    ...mapGetters({
      deferredPrompt: GettersName.settings.getDeferredPrompt
    })
  },
  methods: {
    addToHomeScreen: function() {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then(() => {
        window.deferredPrompt = null;
      });
    }
  },
  destroyed() {
    window.removeEventListener("beforeinstallprompt", () => {});
  }
});
</script>

<style></style>
