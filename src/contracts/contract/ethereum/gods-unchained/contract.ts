import { genImgFunc, genNFTFunc, getSupportImgShortcutFunc } from "src/types/contract";

export const getSupportImgShortcut: getSupportImgShortcutFunc = () => {
  return false;
};

/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns string
 */
export const genImg: genImgFunc = ({ id }, jsonData = null) => {
  if (jsonData) {
    return jsonData.image;
  } else {
    return "";
  }
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft: genNFTFunc = ({ id }) => {};
