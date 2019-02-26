import { loadScripts } from "src/helper/utils";
import { BootInput } from "../types/boot";

export default async ({ app, router, Vue }: BootInput) => {
  if (!window.fetch) {
    loadScripts([
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js",
        integrity:
          "sha384-2kkuqwSCFze1y7UcAejUH6wt2MpQ4naa++zWP0SxyUC/jnwq91SAfe14RAruXtnV",
      },
    ]);
  }
};
