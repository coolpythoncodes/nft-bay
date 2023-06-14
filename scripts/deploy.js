// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy contract
  const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
  const nftMarketPlace = await NFTMarketPlace.deploy();
  await nftMarketPlace.deployed();

  console.log(`NFTMarketPlace Contract address: ${nftMarketPlace.address}\n`);

  saveFrontendFiles(nftMarketPlace,"NFTMarketPlace");
}

function saveFrontendFiles(contract,name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/utils/data";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
