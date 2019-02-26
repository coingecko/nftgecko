<template>
  <div>Component</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ComponentName"
})
class ComponentName extends Vue {}

export default ComponentName;
</script>

<style></style>
