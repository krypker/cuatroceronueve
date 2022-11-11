import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MintGallery from "./components/MintGallery";
import {
  popupConfirmation,
  checkIsMerkleTreeValidJson,
  joinDataArray,
} from "./utils/util";
import {
  mintWhitelist,
  getVerifyMerkleTree,
  tokenIsClaimed,
  mintTokenTransfer,
} from "./utils/_web3";
import { useWeb3React } from "@web3-react/core";

function App() {
  const { active, account } = useWeb3React();
  const [tokenMinting, setTokenMinting] = useState(0);
  const [whitelistMintStatus, setWhitelistMintStatus] = useState(false);
  const [whitelistValid, setWhitelistValid] = useState(false);
  const [whitelistProof, setWhitelistProof] = useState([]);
  const [displayTokens, setDisplayTokens] = useState([]);
  const [tokenMinted, setTokenMinted] = useState(0);
  const [tokenClaimed, setTokenClaimed] = useState(0);

  const onMintWhitelist = async (tokenId) => {
    setTokenMinting(tokenId);
    const { success, blockHash } = await mintWhitelist(
      account,
      whitelistProof,
      tokenId
    );

    popupConfirmation(success, blockHash, tokenId);
    setWhitelistMintStatus(success);
    setTokenMinting(0);
  };

  const onTransferToken = async (to, tokenId) => {
    setTokenMinting(tokenId);
    const { success, blockHash } = await mintTokenTransfer(
      to,
      account,
      tokenId
    );
    popupConfirmation(success, blockHash, tokenId);
    setWhitelistMintStatus(success);
    setTokenMinting(0);
  };

  useEffect(() => {
    if (!active || !account) {
      setWhitelistValid(false);
      return;
    }

    async function chackValidMerkleTree() {
      const { proof } = await checkIsMerkleTreeValidJson(account);
      setWhitelistProof(proof);

      const resultClaimed = await tokenIsClaimed(account);
      setTokenClaimed(resultClaimed);

      const verify = await getVerifyMerkleTree(proof, account);
      setWhitelistValid(verify);
    }
    if (account) {
      chackValidMerkleTree();
    }
  }, [account, active]);

  useEffect(() => {
    setWhitelistMintStatus(false);
    async function getDataArray() {
      const { arrayTokens, totalMinted } = await joinDataArray(tokenMinting);

      setDisplayTokens(arrayTokens == null ? [] : arrayTokens);
      setTokenMinted(totalMinted);
    }

    getDataArray();
  }, [whitelistMintStatus, tokenClaimed, tokenMinting]);

  return (
    <div className='bg-white h-screen container mx-auto'>
      <main>
        <Header onTransferToken={onTransferToken} />
        <Hero
          header='409 AMIGOS'
          message={
            <React.Fragment>
              <p className='mb-4'>
                AMIGOS are 409 friends, artists and enthusiasts who love IDM,
                glitch, experimental techno, noise and the like. Some of them
                may like 409 music and everyone is taking part in his music
                quest.
              </p>
              <p className='mb-4'>
                This is a private slow mint. The allow list will be updated from
                time to time and people in the list will be able to mint one
                AMIGO of their choice...
              </p>
              <p className='mb-5'>
                You can have more info and apply for an AMIGO &nbsp;
                <a
                  className='text-pink-600 cursor-pointer font-bold'
                  rel='noreferrer'
                  href='https://409.gitbook.io/409-amigos/'
                  target='_blank'
                >
                  here.
                </a>
              </p>
            </React.Fragment>
          }
        />
        <MintGallery
          onMintWhitelist={onMintWhitelist}
          tokenMinted={tokenMinted}
          displayTokens={displayTokens}
          tokenMinting={tokenMinting}
          tokenClaimed={tokenClaimed}
          whitelistValid={whitelistValid}
        />
      </main>
    </div>
  );
}

export default App;
