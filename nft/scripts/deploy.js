const hre = require("hardhat");

async function main() {

  const NFT = await hre.ethers.getContractFactory("AWDEVNFT");

  const nft = await NFT.deploy();

  await nft.waitForDeployment();

  console.log("NFT Contract:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
