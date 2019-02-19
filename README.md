# NFT Manager

[![Build Status](https://travis-ci.org/coingecko/nft-manager.svg?branch=master)](https://travis-ci.org/coingecko/nft-manager)

NFT Manager is a web interface to manage CryptoCollectibles and ERC-721 tokens.

# Contributing

For contribution, please refer to [CONTRIBUTING.md](CONTRIBUTING.md)

# Supported Contract

| Name                        | Slug             | Status                                              |
| --------------------------- | ---------------- | --------------------------------------------------- |
| CoinGecko Xmas 2018 NFToken | coingecko        | [Complete](src/contracts/contract/coingecko)        |
| CryptoKitties               | cryptokitties    | [WIP](src/contracts/contract/cryptokitties)         |
| Gods Unchained              | gods-unchained   | [WIP](src/contracts/contract/gods-unchained)        |
| Marble Cards                | marble-nft       | [Complete](src/contracts/contract/marble-nft)       |
| MyCryptoHeroes              | my-crypto-heroes | [Complete](src/contracts/contract/my-crypto-heroes) |

# Feature shipped

## Initial phase (v1.0.0)

- PWA support
- Basic unit test
- Open Zeppelin standard supported
- Show Image of all NFTs owned

# RoadMap

## Phase 1

- [/] Metamask support
- [/] Add test to test all contracts/contract/<nft>/contracts.json for validity
- [/] Test/Specs development using any address as input
- [/] ERC-721 view only. Group by contract and contract name
- [ ] Network selector: Ethereum mainnet, ropsten, rinkeby, kovan

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
