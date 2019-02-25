// Web3Initialize

import { errorNotification, infoNotification } from "src/helper/notifications";
import Vue from "vue";
import Component from "vue-class-component";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { SUPPORTED_NETWORK } from "../contracts/contract";
import { ActionsName, GettersName, MutationsName } from "../store/indexts";

@Component({
  computed: {
    ...mapGetters({
      loading: GettersName.web3.web3Loading,
      message: GettersName.web3.web3LoadingMessage,
      isInitialized: GettersName.web3.web3Initialize,
      networkId: GettersName.web3.web3Network,
      networkName: GettersName.web3.web3NetworkName,
      compKey: GettersName.contract.getCompKey
    })
  },
  methods: {
    ...mapMutations({
      updateCompKey: MutationsName.contract.updateCompKey
    }),
    ...mapActions({
      initializedWeb3: ActionsName.web3.initializeWeb3,
      loadAllContracts: ActionsName.contract.loadAllContracts
    })
  }
})
export class W3iMixin extends Vue {
  // VUE
  public auth = false;
  public ethNetwork = "";
  // VUEX
  // getters data
  public isInitialized!: boolean;
  public networkId!: number;
  public networkName!: string;
  // actions method
  public initializedWeb3!: () => void;
  public loadAllContracts!: (network?: string) => void;
  // mutation method
  public updateCompKey!: () => void;
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
      // if network route exist
      if (this.$route.params.network) {
        // network and route not match
        if (this.$route.params.network !== this.networkName) {
          infoNotification(`Rerouting to ${this.networkName}`, false);
          this.ethNetwork = this.networkName;
          this.pushTo(`/nft/${this.networkName}`);
          this.updateCompKey();
          return;
        } else {
          this.ethNetwork = this.$route.params.network;
          this.auth = true;
        }
      } else {
        this.ethNetwork = this.networkName;
        this.auth = true;
      }
    } else {
      // if network route exist
      if (this.$route.params.network) {
        if (SUPPORTED_NETWORK.hasOwnProperty(this.$route.params.network)) {
          this.ethNetwork = this.$route.params.network;
          this.auth = false;
        } else {
          errorNotification(
            `Network ${this.networkId ||
              this.$route.params.network} not supported`
          );
          this.pushTo(`/nft`);
          this.auth = false;
        }
      } else {
        this.auth = false;
      }
    }
  }
}
