import React from "react";
import useMetaMask from "../utils/metamask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { checkOwnerToken } from "../utils/_web3";
import WalletButton from "./WalletButton";
import Swal from "sweetalert2";

const Header = ({ onTransferToken }) => {
  const { isActive, account } = useMetaMask() || {};
  const OWNER_ADDRESS = process.env.REACT_APP_OWNER_ACCOUNT;

  function transferToken() {
    let id = 0;
    let to = 0;
    Swal.fire({
      title: "Transfer token",
      html: `
    <input type="text" id="id" class="w-5/6 p-2 mx-2 mb-5 rounded-md border-2 text-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none text-gray-700" placeholder="ID Token">
    <input type="text" id="to" pattern='^0x[a-fA-F0-9]{40}$' class="w-5/6 p-2 mx-2 mb-5 text-sm rounded-md border-2 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none text-gray-700" placeholder="To" >
    <input type="text" id="from" readonly class="read-only:bg-gray-100 text-sm w-5/6 p-2 mx-2 mb-5 rounded-md border-2 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none text-gray-700" placeholder="From" value="${OWNER_ADDRESS}">`,
      confirmButtonText: "Transfer",
      confirmButtonColor: "#1e3a8a",
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        id = Swal.getPopup().querySelector("#id").value;
        to = Swal.getPopup().querySelector("#to").value;
        if (!id || !to) {
          Swal.showValidationMessage(
            `Please enter all data [To address and Token Id are required]`
          );
        }
        if (id > 0 && to) {
          const validaToken = await checkOwnerToken(id);
          if (validaToken) {
            Swal.showValidationMessage(`Token #${id} has been assigned`);
          }
        }
        if (id > 409 && to) {
          Swal.showValidationMessage(`Max. token Id 409`);
        }
        return { id, to };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onTransferToken(to, id);
      }
    });
  }

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
              onClick={() => transferToken()}
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
