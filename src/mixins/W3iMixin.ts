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
      networkName: GettersName.web3.web3NetworkName
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
  public ethNetwork = "";
  // VUEX
  // getters data
  public isInitialized!: boolean;
  public networkId!: number;
  public networkName!: string;
  // actions method
  public initializedWeb3!: () => void;
  // method
  public pushTo(path: string) {
    this.$router.push({ path });
  }
  //
  public async mounted() {
    // W3Initialized
    if (!this.isInitialized) {
      try {
      await this.initializedWeb3();
      } catch (err) {
        console.error(err);
      }
    }
    // Check Network
    if (SUPPORTED_NETWORK.hasOwnProperty(this.networkId)) {
      console.log("HERE 1");
      // if network route exist
      if (this.$route.params.network) {
        // network and route not match
        if (this.$route.params.network !== this.networkName) {
          errorNotification(`Rerouting to ${this.networkName}`, false);
          this.pushTo(`/nft/${this.networkName}`);
          // TODO: temporary hack, remove this later
          location.reload();
          return;
        } else {
          this.ethNetwork = this.$route.params.network;
          this.loading = false;
          this.auth = true;
        }
      } else {
        this.ethNetwork = this.networkName;
        this.loading = false;
        this.auth = true;
      }
    } else {
      // if network route exist
      if (SUPPORTED_NETWORK.hasOwnProperty(this.$route.params.network)) {
        console.log("HERE 2");
        this.ethNetwork = this.$route.params.network;
        this.loading = false;
        this.auth = false;
      } else {
        errorNotification(`Network ${this.networkId || this.$route.params.network} not supported`);
        this.pushTo(`/nft`);
        this.loading = false;
        this.auth = false;
      }
    }
  }
}
