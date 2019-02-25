import { genImg } from "src/contracts/contract/ethereum/coingecko/contract.ts";

describe("[Contract] coingecko", () => {
  it("test genImg", () => {
    const res = genImg({ id: 1 });
    expect(res).toEqual(
      "https://nft-assets.coingecko.com/xmas-2018/images-mirror/1.png"
    );
  });
});
