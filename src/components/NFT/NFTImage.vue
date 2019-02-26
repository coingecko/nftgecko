<template>
  <img class="NFT__Image" :title="alt" :src="src" :alt="alt" />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true }
  }
});
</script>

<style>
.NFT__Image {
  max-width: 100%;
  object-fit: contain;
}
</style>
