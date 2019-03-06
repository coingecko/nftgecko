# NFT Gecko

[![Build Status](https://travis-ci.org/coingecko/nft-manager.svg?branch=master)](https://travis-ci.org/coingecko/nftgecko)
[![Netlify Status](https://api.netlify.com/api/v1/badges/08b82cd8-2d1f-4e5c-a921-cdec960554bd/deploy-status)](https://app.netlify.com/sites/nftgecko/deploys)

NFT Gecko is a web interface to manage CryptoCollectibles and ERC-721 tokens.

- [Checkout Docs and Reports](https://coingecko.github.io/nftgecko/)
- [Checkout Master branch site](https://nft-manager.netlify.com)

# Contributing

We are looking to add more NFT projects. Do feel free to contribute.

For more details, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

# Supported Contract

## Ethereum

| Name                        | Slug                       | Status                                                                 |
| --------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| CoinGecko Xmas 2018 NFToken | coingecko                  | [Complete](src/contracts/contract/ethereum/coingecko)                  |
| CryptoKitties               | cryptokitties              | [WIP](src/contracts/contract/ethereum/cryptokitties)                   |
| Gods Unchained              | gods-unchained             | [Complete](src/contracts/contract/ethereum/gods-unchained)             |
| Marble Cards                | marble-nft                 | [Complete](src/contracts/contract/ethereum/marble-nft)                 |
| MyCryptoHeroes:Extension    | my-crypto-heroes-extension | [Complete](src/contracts/contract/ethereum/my-crypto-heroes-extension) |
| MyCryptoHeroes:Hero         | my-crypto-heroes-hero      | [Complete](src/contracts/contract/ethereum/my-crypto-heroes-hero)      |

## Tomo testnet

| Name                        | Slug      | Status                                                         |
| --------------------------- | --------- | -------------------------------------------------------------- |
| CoinGecko Xmas 2018 NFToken | coingecko | [Complete](src/contracts/contract/tomochain_testnet/coingecko) |

## Tomo

| Name | Slug | Status |
| ---- | ---- | ------ |
|      |      |        |

# Feature shipped

## Initial phase (v1.0.0)

- PWA support
- Basic unit test
- Open Zeppelin standard supported
- Show Image of all NFTs owned

# RoadMap

## Phase 1

- [x] Metamask support
- [x] Add test to test all contracts/contract/<nft>/contracts.json for validity
- [x] Test/Specs development using any address as input
- [x] ERC-721 view only. Group by contract and contract name
- [x] Network selector: Ethereum mainnet, ropsten, rinkeby, kovan

## Phase 2

- [ ] Support other token (non ERC721, e.g. cryptokitties)
- [ ] view only for custom metadata
- [ ] view only for custom abi.json

## Phase 3

- [ ] Transfer for ERC721
- [ ] Custom ABI.json for transfer
- [ ] E2E testing with cypress

## Future Phases

- [ ] Dark mode
- [ ] Ledger support
- [ ] Trezor support
- [ ] Walletconnect support
- [ ] Network selector: Other EVM compatible networks

# License

MIT
