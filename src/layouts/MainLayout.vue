<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <router-link to="/">
            {{ $t("app.name") }}
          </router-link>
        </q-toolbar-title>

        <div class="relative-position Layout__Settings" v-ripple>
          <router-link to="/settings">
            <q-icon name="settings" />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-secondary">
      <q-list>
        <q-item-label header>{{ $t("app.name") }}</q-item-label>
        <router-link to="/">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
              <q-item-label caption>Homepage of NFT Manager</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <router-link to="/nft">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="card_giftcard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Available NFT</q-item-label>
              <q-item-label caption>Listing of all available NFTs</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <router-link to="/settings">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
              <q-item-label caption>Settings</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
      <q-list>
        <q-item-label header>External Site</q-item-label>
        <q-item
          clickable
          tag="a"
          rel="noreferrer"
          target="_blank"
          href="https://www.coingecko.com/buzz/a-brief-guide-to-trading-collectibles-on-opensea?locale=en"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Brief Guide</q-item-label>
            <q-item-label caption>coingecko.com/buzz</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          rel="noreferrer"
          target="_blank"
          href="https://github.com/coingecko/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/coingecko</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar class="Footer__Container text-white shadow-2 rounded-borders">
        <span class="Footer__Text">
          © 2019 CoinGecko. All Rights Reserved.
        </span>
        <q-space />
        <q-tabs v-model="tab" class="Footer__Text">
          <q-tab name="tab1" label="GitHub" />
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
      leftDrawerOpen: this.$q.platform.is.desktop,
      tab: ""
    };
  },
  methods: {
    openURL
  }
};
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

.Footer__Container {
  background: #ade75f;
}

.Footer__Text {
  color: black;
}
</style>
