export const balanceOfDestructure = (abi, balanceOf, input) => {
  const balItem = abi.find(item => item.name === balanceOf);
  if (balItem.outputs.length === 1) {
    const name = balItem.outputs[0].name;
    return parseInt(name !== "" ? input[name] : input);
  } else {
    return parseInt(input);
  }
};
