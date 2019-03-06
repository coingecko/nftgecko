<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      v-dm-class="{
        dark: 'bg-primary text-white',
        light: 'bg-green-4 text-black'
      }"
    >
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="q-pl-sm" @click.native="setHomeTab">{{
            $t("app.name")
          }}</router-link>
        </q-toolbar-title>
        <div class="relative-position Layout__Settings" v-ripple>
          <router-link to="/settings">
            <q-icon name="fas fa-cog" />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container
      class="q-py-sm"
      v-dm-class="{
        dark: 'bg-black text-white',
        light: 'bg-green-2 text-black'
      }"
    >
      <router-view />
    </q-page-container>
    <q-footer>
      <q-toolbar
        class="shadow-2 rounded-borders row"
        v-dm-class="{
          dark: 'bg-primary text-white',
          light: 'bg-green-3 text-black'
        }"
      >
        <q-tabs v-model="tab" class="Footer__Text col text-center">
          <router-link to="/">
            <q-tab name="/" icon="fas fa-wallet" label="Wallet" />
          </router-link>
          <router-link to="/nft">
            <q-tab name="/nft" icon="fas fa-coins" label="Supported NFTs" />
          </router-link>
          <a
            href="https://github.com/coingecko/nftgecko"
            rel="noreferrer"
            target="_blank"
          >
            <q-tab name="github" icon="fab fa-github" label="GitHub" />
          </a>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { openURL } from "quasar";
import { Component, Vue } from "vue-property-decorator";
import { darkModeClassDirectives } from "src/directives/darkModeClass";

@Component({
  name: "MyLayout",
  directives: {
    "dm-class": darkModeClassDirectives
  }
})
class MainLayout extends Vue {
  openURL = openURL;

  get tab(): string {
    const urlPath = this.$route.path.split("/").filter(d => d !== "");
    return urlPath.length >= 1 ? `/${urlPath[0]}` : "/";
  }

  set tab(_val) {}

  setHomeTab() {
    this.tab = "/";
  }
}

export default MainLayout;
</script>

<style>
.Layout__Settings {
  width: 2rem;
  height: 2rem;
  /* background: black; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Layout__Settings i {
  font-size: 1.4rem;
}
</style>
