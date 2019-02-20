import { genImgFunc, genNFTFunc } from "~/src/types/contract";


/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns {{shortcut: boolean, imgAddr: string}}
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
  return {
    imgAddr: `https://tenthousandsu.com/erc721/${formattedId}.png`,
    shortcut: true
  };
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft: genNFTFunc = ({ id }) => {};
