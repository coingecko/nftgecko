import openZeppelinAbi from "src/contracts/assets/abi/openzeppelin.abi.json";
import kittiesAbi from "src/contracts/assets/abi/cryptokitties.abi.json";
import { balanceOfDestructure } from "src/helper/abi";

describe("abi helper function", () => {
  it("get proper balance of", () => {
    const openZeppelinInput = 1;
    expect(
      balanceOfDestructure(openZeppelinAbi, "balanceOf", openZeppelinInput)
    ).toEqual(1);
    const kittiesInput = { "0": "0", count: "0" };
    expect(balanceOfDestructure(kittiesAbi, "balanceOf", kittiesInput)).toEqual(
      0
    );
  });
});
