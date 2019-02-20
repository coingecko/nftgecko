import { genImg } from "src/contracts/contract/coingecko/contract.ts";

describe("[Contract] coingecko", () => {
  it("test genImg", () => {
    const res = genImg({ id: 1 });
    expect(res.imgAddr).toEqual(
      "https://nft-assets.coingecko.com/xmas-2018/images-mirror/1.png"
    );
  });
});
