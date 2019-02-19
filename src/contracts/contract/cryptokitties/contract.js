/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns {{shortcut: boolean, imgAddr: string}}
 */
export const genImg = ({ id }) => {
  return {
    imgAddr: "",
    shortcut: false
  };
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft = ({ id }) => {};
