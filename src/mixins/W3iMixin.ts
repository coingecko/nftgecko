// Web3Initialize

import { errorNotification } from "src/helper/notifications";
import Vue from "vue";
import Component from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import { SUPPORTED_NETWORK } from "../contracts/contract";
import { ActionsName, GettersName } from "../store/indexts";

@Component({
  computed: {
    ...mapGetters({
      isInitialized: GettersName.web3.web3Initialize,
      networkId: GettersName.web3.web3Network,
      networkName: GettersName.web3.web3NetworkName,
    })
  },
  methods: {
    ...mapActions({
      initializedWeb3: ActionsName.web3.initializeWeb3
    })
  }
})
export class W3iMixin extends Vue {
  // VUE
  public loading = false;
  public auth = false;
  // VUEX
  // getters data
  public isInitialized!: boolean;
  public networkId!: number;
  public networkName!: string;
  // actions method
  public initializeWeb3!: () => void;
  // method
  public pushTo(path: string) {
    this.$router.push({ path });
  }
  //
  public async mounted() {
    // W3Initialized
    if (!this.isInitialized) {
      await this.initializeWeb3();
    }
    // Check Network
    if (SUPPORTED_NETWORK.hasOwnProperty(this.networkId)) {
      // if network route exist
      if (this.$route.params.network) {
        // network and route not match
        if (this.$route.params.network !== this.networkName) {
          errorNotification(`Rerouting to ${this.networkName}`, false);
          this.pushTo(`/nft/${this.networkName}`);
          return;
        } else {
          this.loading = false;
          this.auth = true;
        }
      } else {
          this.loading = false;
          this.auth = true;
      }
    } else {
      errorNotification(`Netowrk ${this.networkId} not supported`);
      this.loading = false;
      this.auth = false;
    }
  }
}
