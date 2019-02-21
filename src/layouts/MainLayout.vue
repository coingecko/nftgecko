<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="q-pl-sm" @click.native="setHomeTab">
            {{ $t("app.name") }}
          </router-link>
        </q-toolbar-title>

        <div class="relative-position Layout__Settings" v-ripple>
          <router-link to="/settings">
            <q-icon name="fas fa-cog" />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-py-sm">
      <router-view />
      <div class="row">
        <span class="col Footer__Text text-white text-center">
        </span>
      </div>
    </q-page-container>

    <q-footer>
      <q-toolbar
        class="Footer__Container shadow-2 rounded-borders bg-primary row"
      >
        <q-tabs v-model="tab" class="Footer__Text text-white col text-center">
          <router-link to="/">
            <q-tab
              class="text-green"
              name="/"
              icon="fas fa-wallet"
              label="Wallet"
            />
          </router-link>
          <router-link to="/nft">
            <q-tab
              class="text-orange"
              name="/nft"
              icon="fas fa-coins"
              label="Supported NFTs"
            />
          </router-link>
          <router-link to="/settings">
            <q-tab
              class="text-teal"
              name="/settings"
              icon="fas fa-cog"
              label="Settings"
            />
          </router-link>
          <a
            href="https://github.com/coingecko/nft-manager"
            rel="noreferrer"
            target="_blank"
          >
            <q-tab
              class="text-white"
              name="github"
              icon="fab fa-github"
              label="GitHub"
            />
          </a>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      tab: ""
    };
  },
  methods: {
    openURL,
    setHomeTab: function() {
      this.tab = "/";
    }
  },
  created() {
    this.tab = this.$route.path;
  }
};
</script>

<style>
body {
  background: #2c2f38;
}

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

.Footer__Container {
  background: #fff;
}

.Footer__Text {
  color: black;
}
</style>
