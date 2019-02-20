import { genImgFunc, genNFTFunc } from "src/types/contract";

/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns {{shortcut: boolean, imgAddr: string}}
 */
export const genImg: genImgFunc = ({ id }) => {
  return {
    imgAddr: `https://nft-assets.coingecko.com/xmas-2018/images-mirror/${id}.png`,
    shortcut: true
  };
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft: genNFTFunc = ({ id }) => {};
