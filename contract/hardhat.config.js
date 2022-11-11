require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { MAINNET_API_URL, GOERLI_API_URL, PRIVATE_KEY } = process.env;

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    mainnet: {
      url: MAINNET_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 55000000000,
    },
    goerli: {
      url: GOERLI_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 55000000000,
    },
  },
};
