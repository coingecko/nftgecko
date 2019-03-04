<template>
  <q-page padding class="row flex justify-center">
    <q-card
      class="col-xs-12 col-sm-10 col-md-8 col-lg-6 "
      v-dm-class="{ dark: 'bg-grey-9', light: 'bg-green-1' }"
    >
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
        <div>
          <span class="text-h5 q-pb-sm">Dark Mode</span>
          <q-toggle v-model="darkMode"></q-toggle>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { GettersName, ActionsName, MutationsName } from "src/store";
import { Component, Vue, Mixins } from "vue-property-decorator";
import { darkModeClassDirectives } from "src/directives/darkModeClass";

@Component({
  name: "SettingsPage",
  directives: {
    "dm-class": darkModeClassDirectives
  },
  computed: {
    ...mapGetters({
      deferredPrompt: GettersName.settings.getDeferredPrompt
    })
  }
})
class SettingsPage extends Vue {
  get darkMode() {
    return this.$store.state.settings.darkMode;
  }

  set darkMode(val: boolean) {
    this.$store.dispatch(ActionsName.settings.storeDarkMode, val);
  }

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
