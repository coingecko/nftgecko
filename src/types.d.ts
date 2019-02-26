import web3 from "web3";
import Vue from "vue";

type VueObj = typeof Vue;

declare module "*.vue" {
  export default VueObj;
}

declare global {
  interface Window {
    ethereum: any;
    web3: web3;
    deferredPrompt: any;
  }
}

window.ethereum = window.ethereum || {};
window.web3 = window.web3 || {};
window.deferredPrompt = window.deferredPrompt || {};
