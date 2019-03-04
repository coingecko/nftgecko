<template>
  <img class="nft-img" :title="alt" :src="src" :alt="alt" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "NFTImageComponent"
})
class NFTImageComponent extends Vue {
  @Prop(String) src: string;
  @Prop(String) alt: string;
}

export default NFTImageComponent;
</script>

<style scoped>
.nft-img {
  max-width: 100%;
  object-fit: contain;
}
</style>
