async function main() {
  const Mint409 = await ethers.getContractFactory("Mint409");

  const mint409 = await Mint409.deploy(
    "https://nftstorage.link/ipfs/bafybeiaucks4657whvg6tlysvwriaibmi6th5jizux3l4qddp7v6vw6w64/"
  );
  console.log("Contract deployed to address:", mint409.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
