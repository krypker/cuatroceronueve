import React from "react";
import useMetaMask from "../utils/metamask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { popupForm } from "../utils/util";
import WalletButton from "./WalletButton";

const Header = () => {
  const { isActive, account } = useMetaMask() || {};
  const OWNER_ADDRESS = process.env.REACT_APP_OWNER_ACCOUNT;

  return (
    <div className='flex justify-between lg:justify-center items-center mx-auto w-full'>
      <div className='flex flex-beteew p-6 w-1/4'>
        <ul className='flex menu items-start justify-start gap-3'>
          <li key='1'>
            <a
              href='https://cuatroceronueve.io'
              target='_blank'
              className='social'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </li>
          <li key='2'>
            <a
              href='https://discord.gg/wuDCbbZHFE'
              target='_blank'
              rel='noreferrer'
              className='social'
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </li>
        </ul>
      </div>
      <div className='lg:block hidden w-5/6 md:w-4/6'>
        <ul className='flex items-center justify-end gap-3'>
          <li
            key='1'
            className={!isActive || account !== OWNER_ADDRESS ? "hidden" : ""}
          >
            <a
              className='link'
              href='#'
              rel='noreferrer'
              onClick={() => popupForm()}
            >
              Transfer
            </a>
          </li>
          <li key='2' className='flex'>
            <WalletButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
