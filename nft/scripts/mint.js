const hre = require("hardhat");

async function main() {

  const contractAddress = "YOUR_CONTRACT_ADDRESS";

  const metadataURI =
    "ipfs://REPLACE_METADATA_CID/1.json";

  const nft = await hre.ethers.getContractAt(
    "AWDEVNFT",
    contractAddress
  );

  const tx = await nft.mintNFT(
    "0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",
    metadataURI
  );

  await tx.wait();

  console.log("NFT Minted");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
