import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import images from "./images.js";
import MintCard from "./MintCard";

export default function MintGallery({
  onMintWhitelist,
  tokenMinted,
  displayTokens,
  tokenMinting,
  tokenClaimed,
  whitelistValid,
}) {
  const [checkActive, setCheckActive] = useState([1]);

  return (
    <div className='pt-8 py-44'>
      <div className='mx-auto mb-6 mt-3 lg:px-24 px-6 flex items-center text-center lg:justify-start justify-center lg:gap-5 gap-3 text-gray-400 lg:text-md text-sm'>
        <div className='text-gray-500'>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <div>
          <input
            type='checkbox'
            id='allToken'
            name='allToken'
            value='allToken'
            checked={checkActive == 1}
            onChange={() => setCheckActive([1])}
          />
          <label htmlFor='allToken' className='ml-1 text-gray-500'>
            All ({images.length})
          </label>
        </div>
        <div>
          <input
            type='checkbox'
            id='allMinted'
            name='allToken'
            value='allMinted'
            checked={checkActive == 2}
            onChange={() => setCheckActive([2])}
          />
          <label htmlFor='allMinted' className='ml-1 text-gray-500'>
            AMIGOS ({tokenMinted})
          </label>
        </div>
        <div>
          <input
            type='checkbox'
            id='allMinted'
            name='allToken'
            value='allMinted'
            checked={checkActive == 3}
            onChange={() => setCheckActive([3])}
          />
          <label htmlFor='notMinted' className='ml-1 text-gray-500'>
            Not minted ({images.length - tokenMinted})
          </label>
        </div>
      </div>

      <div
        style={{ caretcolor: "transparent" }}
        className='grid max-w-max px-[40px] gap-9 mx-auto xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 '
      >
        {displayTokens
          .filter((filtro) =>
            checkActive == 1
              ? !filtro.contract || filtro.contract
              : checkActive == 2
              ? filtro.contract
              : checkActive == 3
              ? !filtro.contract
              : displayTokens
          )
          .map((item) => (
            <MintCard
              identificador={item.token_id}
              picture={item.image}
              key={item.token_id}
              available={item.available}
              owner={item.owner}
              contract={item.contract}
              minting={tokenMinting}
              canMint={tokenClaimed}
              whitelist={whitelistValid}
              onMintWhitelist={onMintWhitelist}
            />
          ))}
      </div>
    </div>
  );
}

/*
import { useWeb3React } from "@web3-react/core";
import {
  mintWhitelist,
  tokenIsClaimed,
  getVerifyMerkleTree,
} from "../utils/_web3";
import {
  checkIsMerkleTreeValidJson,
  joinDataArray,
  popupConfirmation,
} from "../utils/util";

/*
  const { active, account } = useWeb3React();
  const [whitelistValid, setWhitelistValid] = useState(false);
  const [whitelistMintStatus, setWhitelistMintStatus] = useState();  
  const [whitelistProof, setWhitelistProof] = useState([]);
  const [displayTokens, setDisplayTokens] = useState([]);
  const [tokenMinted, setTokenMinted] = useState(0);
  const [tokenClaimed, setTokenClaimed] = useState(0);
  const [tokenMinting, setTokenMinting] = useState(0);  
  
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
  */
