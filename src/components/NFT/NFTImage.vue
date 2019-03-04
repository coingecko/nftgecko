<template>
  <q-img
    class="nft-img"
    :title="alt"
    :src="src"
    :alt="alt"
    @mouseenter.native="mouseOver"
    @mouseleave.native="mouseLeave"
  >
    <div
      class="absolute-bottom text-center text-italic text-body2"
      v-show="showText"
    >
      {{ alt }}
    </div>
    <template v-slot:error>
      <div class="absolute-full flex flex-center bg-warning text-white">
        Cannot load image
      </div>
    </template>
  </q-img>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "NFTImageComponent"
})
class NFTImageComponent extends Vue {
  @Prop(String) src: string;
  @Prop(String) alt: string;

  showText = false;

  mouseOver() {
    this.showText = true;
  }

  mouseLeave() {
    this.showText = false;
  }
}

export default NFTImageComponent;
</script>

<style scoped>
.nft-img {
  max-width: 100%;
  object-fit: contain;
}
</style>
