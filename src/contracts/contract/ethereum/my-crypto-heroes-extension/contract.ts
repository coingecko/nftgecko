import { genImgFunc, genNFTFunc, getSupportImgShortcutFunc } from "src/types/contract";

export const getSupportImgShortcut: getSupportImgShortcutFunc = () => {
  return true;
};

/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns string
 */
export const genImg: genImgFunc = ({ id }) => {
  const formattedId = `${id}`.slice(0, 4);
  return `https://www.mycryptoheroes.net/images/extensions/2000/${formattedId}.png`;
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft: genNFTFunc = ({ id }) => {};
