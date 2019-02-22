import fs from "fs";
import path from "path";
import util from "util";

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);

describe("Test for all contracts.json", () => {
  const location = path.join("src/contracts/contract");
  const NETWORK_NAMES = fs
    .readdirSync(location)
    .filter((name) => name !== "index.ts");
  const files: any[] = [];
  NETWORK_NAMES.forEach((network) => {
    const FILENAME = fs.readdirSync(path.join(location, network));
    FILENAME.forEach((file) => {
      const jsonFile = fs.readFileSync(
        path.join(location, network, file, "contract.json"),
        "utf-8"
      );
      files.push(JSON.parse(jsonFile));
    });
  });

  it("shows valid json", async () => {
    const validJson = await readFile(
      path.join("templates/contracts/contract/contract.json"),
      "utf-8"
    );
    const parsedJson = JSON.parse(validJson);
    files.forEach((file) => {
      expect(Object.keys(file).sort()).toEqual(Object.keys(parsedJson).sort());
      expect(Object.keys(file.image).sort()).toEqual(Object.keys(parsedJson.image).sort());
      expect(Object.keys(file.contract).sort()).toEqual(Object.keys(parsedJson.contract).sort());
    });
  });

  it("check for valid abi.json", async () => {
    const res = await Promise.all(
      files.map((file) => {
        const loc = path.join("src/contracts/assets/abi", file.abi);
        return stat(loc);
      })
    );
    res.forEach((fileStat) => {
      // @ts-ignore
      expect(fileStat).not.equal(undefined);
    });
  });
});
