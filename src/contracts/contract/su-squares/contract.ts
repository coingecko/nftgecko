import { getSupportImgShortcutFunc, genImgFunc, genNFTFunc } from "~/src/types/contract";

export const getSupportImgShortcut: getSupportImgShortcutFunc = () => {
  return true;
}

/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns string
 */
export const genImg: genImgFunc = ({ id }) => {
const pad = (number: number, size: number) => {
  let s = String(number);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};
  const formattedId = pad(id, 5);
  return `https://tenthousandsu.com/erc721/${formattedId}.png`;
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft: genNFTFunc = ({ id }) => {};
