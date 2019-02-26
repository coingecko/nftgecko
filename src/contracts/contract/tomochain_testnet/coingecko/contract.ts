import {
  genImgFunc,
  genNFTFunc,
  getSupportImgShortcutFunc
} from "src/types/contract";

export const getSupportImgShortcut: getSupportImgShortcutFunc = () => {
  return true;
};

/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns string
 */
export const genImg: genImgFunc = ({ id }) => {
  return `https://nft-assets.coingecko.com/xmas-2018/images-mirror/${id}.png`;
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft: genNFTFunc = ({ id }) => {};
