import { nameFactory } from "src/helper/utils";

describe("[util]", () => {
  it("generate necessary name obj with nameFactory", () => {
    const mutations = {
      someName1: "someName1",
      someName2: "someName2"
    };
    const res = nameFactory("web3", mutations);
    expect(res).toEqual({
      someName1: "web3/someName1",
      someName2: "web3/someName2"
    });
  });
});
