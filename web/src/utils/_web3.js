import React from "react";
import Web3 from "web3";

const NFT_ADDRESS = process.env.REACT_APP_NFT_ADDRESS;
const contractABI = require("../data/mint409.json");

const webQuery = new Web3(
  new Web3.providers.HttpProvider(`${process.env.REACT_APP_PROVIDER}`)
);
const web3 = new Web3(Web3.givenProvider);

export const mint409 = new web3.eth.Contract(contractABI.abi, NFT_ADDRESS);
export const mintQuery409 = new webQuery.eth.Contract(
  contractABI.abi,
  NFT_ADDRESS
);

export const getTokenAvatar = async (account) => {
  const result = await mint409.methods
    .tokenAvatar(account)
    .call({ from: account })
    .then((result) => {
      return result > 0 ? result : false;
    })
    .catch(() => {
      return false;
    });

  return result;
};

export const tokenIsClaimed = async (account) => {
  const result = await mint409.methods
    .claimed(account)
    .call({ from: account })
    .then((result) => {
      return result;
    })
    .catch(() => {
      return false;
    });

  return result;
};

export const getVerifyMerkleTree = async (proof, account) => {
  const result = await mint409.methods
    .verifyMerkleTree(proof)
    .call({ from: account })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });

  return result;
};

export const mintWhitelist = async (account, proof, tokenId) => {
  const result = await mint409.methods
    .mint(proof, tokenId)
    .send({ from: account })
    .then((result) => {
      return {
        success: true,
        blockHash: result.blockHash,
        status: `Transaction succesful` + result.blockHash,
      };
    })
    .catch((err) => {
      return {
        success: false,
        blockHash: null,
        status: "Something went wrong: " + err.message,
      };
    })
    .finally((result) => {
      return result;
    });
  return result;
};

export const mintTokenTransfer = async (to, from, tokenId) => {
  const result = await mint409.methods
    .transfer(to, tokenId)
    .send({ from: from })
    .then((result) => {
      return {
        success: true,
        blockHash: result.blockHash,
        status: `Transaction succesful` + result.blockHash,
      };
    })
    .catch((err) => {
      return {
        success: false,
        blockHash: null,
        status: "Transaction has been reverted by the EVM.",
      };
    })
    .finally((result) => {
      return result;
    });
  return result;
};

export const checkOwnerToken = async (tokenId) => {
  const result = await mintQuery409.methods
    .ownerOf(tokenId)
    .call()
    .then(function () {
      return true;
    })
    .catch((err) => {
      return false;
    });

  return result;
};

export const getContractTokenID = async () => {
  const result = await mintQuery409.methods
    .getListTokenID()
    .call()
    .then(function (res) {
      return res;
    })
    .catch(() => {
      return [];
    });

  return result;
};

export const getContractOwners = async () => {
  const result = await mintQuery409.methods
    .getListTokenOwners()
    .call()
    .then(function (res) {
      return res;
    })
    .catch(() => {
      return [];
    });

  return result;
};

export const getTokenCount = async () => {
  const result = await mintQuery409.methods
    .tokenCount()
    .call()
    .then(function (res) {
      return res;
    })
    .catch(() => {
      return [];
    });

  return result;
};

export default function blank() {
  return <></>;
}
