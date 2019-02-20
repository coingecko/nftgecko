export type genImgFunc = (payload: {id: number}) => {imgAddr: string, shortcut: boolean}
export type genNFTFunc = (payload: {id: number}) => void;