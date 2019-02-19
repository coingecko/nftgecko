import { genImg } from "src/contracts/contract/my-crypto-heroes-extension/contract";

describe("[Contract] coingecko", () => {
  it("test genImg", () => {
    const res = genImg({ id: 30040455 });
    expect(res.imgAddr).toEqual(
      "https://www.mycryptoheroes.net/images/extensions/2000/3004.png"
    );
  });
});
