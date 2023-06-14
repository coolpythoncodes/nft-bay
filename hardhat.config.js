require("@nomicfoundation/hardhat-toolbox");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { privateKey, polygonScanApiKey } = require("./secret.json");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: polygonScanApiKey,
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
