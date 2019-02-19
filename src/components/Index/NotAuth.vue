<script>
import AvailableNFTComponent from "src/components/Shared/AvailableNFT.vue";
import LandingVue from "src/components/Landing/Landing.vue";

// @ts-ignore
export default {
  functional: true,
  // since vue does not support Fragment, this is the hack
  render: h => [h(LandingVue), h(AvailableNFTComponent)]
};
</script>
