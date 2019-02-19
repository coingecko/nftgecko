import { Web3Class } from "src/helper/class/Web3";
import Web3 from "web3";

describe("Web3 class", () => {
  jest.setTimeout(10000);

  const w3 = new Web3Class();
  // TODO: Create a mock provider
  // const provider = new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT);

  it("initialize web3", () => {
    expect(w3.web3).toBe(undefined);
    expect(w3.token).toEqual({});
  });

  xit("sets web3", () => {
    // w3.setWeb3(provider);
    expect(w3.web3).not.equal(undefined);
  });

  xit("get available address", async () => {
    const address = await w3.getAvailableAddress();
    expect(address).toEqual([]);
  });
});
