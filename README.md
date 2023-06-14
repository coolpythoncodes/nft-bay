<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

![](https://img.shields.io/badge/Hackathon-blueviolet)

[![Contributors][contributors-shield]][contributors-url]
[![GitHub issues][issues-shield]][issues-url]
[![GitHub forks][forks-shield]][forks-url]
[![GitHub stars][star-shield]][star-url]
[![GitHub license][license-shield]][license-url]

# NFT Bay

### Brief description

NFT Bay is a decentralized marketplace that empowers users to create, sell, and auction Non-Fungible Tokens (NFTs).

NFT Bay enables creators to mint and showcase their unique NFT creations, while buyers can browse a diverse range of digital assets and securely transact using cryptocurrency.

Through its auction functionality, NFT Bay offers an exciting opportunity for users to participate in bidding wars and discover rare and exclusive NFTs.

With a focus on community, transparency, and innovation, NFT Bay aims to revolutionize the NFT ecosystem by fostering creativity, enabling fair value exchange, and empowering artists and collectors alike with royalties.

This project was bootstrapped with [`create-t3-app`](https://create.t3.gg/).

## Technology Stack & Tools

- NextJS
- Hardhat
- Solidity
- wagmi
- Web3Modal
- NFT.storage
- Polygon chain

### Install

```bash
git clone https://github.com/coolpythoncodes/nft-bay

yarn install

# create a web3modal project from https://cloud.walletconnect.com/sign-in
# to get WEB3_MODAL_PROJECT_ID

# create a nft.storage account from https://nft.storage/
# to get NFT_STORAGE_API_KEY

# create a polygon scan account from https://polygonscan.com/myapikey
# to get POLYGONSCAN_API_KEY

- Copy `.env.example` to a new `.env` file on nft-bay root folder

- Add your `WEB3_MODAL_PROJECT_ID` and `NFT_STORAGE_API_KEY` to the `.env` file

-  Copy `secret.example.json` to a new `secret.json` // ensure you don't expose this to the public

- Add your `polygonScanApiKey` and `privateKey` to the `secret.json` file

# Compile your smart contracts.
pnpm hardhat compile

# Deploy on polygon mumbai testnet

npx hardhat run scripts/deploy.js --network polygon_mumbai

# the deployed contract address will be displayed on the console and stored in `src/data/NFTMarketPlace-address.json`

# Verify your smart contracts on polygonscan

pnpm hardhat verify --network polygon_mumbai <contract_address>

# run the script below to generate the types for the contract

pnpm wagmi generate

# Get your web development server running.
pnpm dev

```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐ if you like this project!

## Useful links

- [Web3Modal Project ID](https://cloud.walletconnect.com/sign-in)
- [NFT Storage](https://nft.storage/)
- [Polygon Scan api key](https://polygonscan.com/myapikey)
- [Verified NFT Bay address on Polygon scan](https://mumbai.polygonscan.com/address/0x88c301AEF5EB979F30a781b2Cb13019218AbA7C3#code)

[contributors-shield]: https://img.shields.io/github/contributors/coolpythoncodes/nft-bay?style=for-the-badge
[contributors-url]: https://github.com/coolpythoncodes/nft-bay/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/coolpythoncodes/nft-bay?style=for-the-badge
[issues-url]: https://github.com/coolpythoncodes/nft-bay/issues
[forks-shield]: https://img.shields.io/github/forks/coolpythoncodes/nft-bay?style=for-the-badge
[forks-url]: https://github.com/coolpythoncodes/nft-bay/network
[star-shield]: https://img.shields.io/github/stars/coolpythoncodes/nft-bay?style=for-the-badge
[star-url]: https://github.com/coolpythoncodes/nft-bay/stargazers
[license-shield]: https://img.shields.io/github/license/coolpythoncodes/nft-bay?style=for-the-badge
[license-url]: https://github.com/coolpythoncodes/nft-bay/blob/main/LICENSE.md
