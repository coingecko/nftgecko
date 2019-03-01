<template>
  <div class="fixed-center text-center">
    <p class="text-faded">
      Sorry, nothing here...
      <strong>(404)</strong>
    </p>
    <q-btn color="primary" style="width:200px;" @click="$router.push('/')"
      >Go back</q-btn
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Error404Page"
})
class Error404Page extends Vue {}

export default Error404Page;
</script>
