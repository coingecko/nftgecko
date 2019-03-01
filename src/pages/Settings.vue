<template>
  <q-page padding class="row flex justify-center">
    <q-card class="col-xs-12 col-sm-10 col-md-8 col-lg-6 ">
      <div class="row q-px-md">
        <div class="col col-12 q-py-md">
          <span class="text-h3">Settings</span>
        </div>
        <div class="col col-12 q-py-sm flex column" v-if="deferredPrompt">
          <span class="text-h5 q-pb-sm">Add To Homescreen</span>
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
import { mapGetters } from "vuex";
import { GettersName } from "src/store";
import { Component, Vue, Mixins } from "vue-property-decorator";

@Component({
  name: "SettingsPage",
  computed: {
    ...mapGetters({
      deferredPrompt: GettersName.settings.getDeferredPrompt
    })
  }
})
class SettingsPage extends Vue {
  public addToHomeScreen() {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then(() => {
      window.deferredPrompt = null;
    });
  }
}

export default SettingsPage;
</script>

<style></style>
