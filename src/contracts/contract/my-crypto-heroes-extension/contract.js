/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns {{shortcut: boolean, imgAddr: string}}
 */
export const genImg = ({ id }) => {
  const formattedId = `${id}`.slice(0, 4);
  return {
    imgAddr: `https://www.mycryptoheroes.net/images/extensions/2000/${formattedId}.png`,
    shortcut: true
  };
};

/** A function to get NFT's data
 *
 * @param {{id: number}} payload
 */
export const getNft = ({ id }) => {};
