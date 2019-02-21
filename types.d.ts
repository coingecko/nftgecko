import web3 from "web3";
declare module "*.vue" {
  import Vue from "vue";
  export default typeof Vue;
}

declare global {
  interface Window {
    ethereum: any;
    web3: web3;
  }
}

declare module "identicon.js";

window.ethereum = window.ethereum || {};
window.web3 = window.web3 || {};