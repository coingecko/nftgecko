import path from "path";
import fs from "fs";
import util from "util";

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);

const location = path.join("src/contracts/contract");
const NAMES = fs.readdirSync(location).filter(name => name !== "index.js");

describe("Test for all contracts.json", () => {
  let files = NAMES.map(name => {
    const jsonFile = fs.readFileSync(
      path.join(location, name, "contract.json"),
      "utf-8"
    );
    return JSON.parse(jsonFile);
  });

  it("shows valid json", async () => {
    const validJson = await readFile(
      path.join("templates/contracts/contract/contract.json"),
      "utf-8"
    );
    const parsedJson = JSON.parse(validJson);
    files.forEach(file => {
      expect(file).keys(...Object.keys(parsedJson));
      expect(file.image).keys(...Object.keys(parsedJson.image));
      expect(file.contract).keys(...Object.keys(parsedJson.contract));
    });
  });

  it("check for valid abi.json", async () => {
    const res = await Promise.all(
      files.map(file => {
        const loc = path.join("src/contracts/assets/abi", file.abi);
        return stat(loc);
      })
    );
    res.forEach(fileStat => {
      expect(fileStat).not.equal(undefined);
    });
  });
});
