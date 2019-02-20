const pad = function(number, size) {
  var s = String(number);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

/** A function to get NFT's image
 *
 * @param {{id: number}} payload
 * @returns {{shortcut: boolean, imgAddr: string}}
 */
export const genImg = ({ id }) => {
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
export const getNft = ({ id }) => {};
