////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//                                                                                                            //
//                            ┴┴┴┴┴┴┴┘        "┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴`        "┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴                   //
//                        ▐▒▒▓▓▓▓▓▓▓▓▌     ╠▒╠▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▀╠╠░  ╠▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▌╠╠                //
//                     ╠▄▄▄▄▓▓▓▓▓▓▓▓▓▌     ╠▄▓▓▓▓▓▓▀▀▀▀▀▀▀▀▀▓▓▓▓▄▓▓▌ ▐▄▓▓▓▓▓▓▓▀▀▀▀▀▀▀▀▓▓▓▓▓▄▄▓                //
//                 ,▄▄▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▌    ╙▓▓▓▓▓▓▓▓▀┴┴┴┴┴┴┴▀▓▓▓▓▓▓▓▄ ║▓▓▓▓▓▓▓▓┴┴┴┴┴┴┴┴▓▓▓▓▓▓▓▓▄               //
//              ╓▄▄▄▄▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄,,╓ ╙▓▓▓▓▓▓▓▓░"""""""▀▓▓▓▓▓▓▓▄ ▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╕               //
//              ╟▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ `▓▓▓▓▓▓▓▓        ╠▓▓▓▓▓▓▓█    `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓m               //
//              ╟▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ,▓▓▓▓▓▓▓▓        ║▓▓▓▓▓▓▓█    ,,,,,,,,,,,,,,▓▓▓▓▓▓▓▓∩               //
//             ╓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▓▓▓▓▓▓▓▄▄  ▄▓▓▓▓▓▓▓▀        ▄▓▓▓▓▓▓▓▀    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▓▓▓▓▓▓▓┘               //
//             .--╓╓╓╓╓╓╓╓╓-4▄▓▓▓▓▓▓▓▓╓,  ▄▓▓▓▓▓▓▓▓"¬¬¬¬¬¬╔▓▓▓▓▓▓▓▓▀      ¬  ¬    9▓▀▓▓▓▓▓▓▓▓▓┘               //
//                           ╣▓▓▓▓▓▓▓▌    #███▓▓▓▓▓▀▀▀▀▀▀▀▓▓▓▓▓▓▓██▀     ▀▀▀▀▀▀▀▀▀▓▓▓▓▓▓███+-                 //
//                           ██▀▀▀▀█▀     *~!^█▀▀▀▀▀▀▀▀▀▀▀▀█████▀0≈     ⁿ▀▀▀▀▀▀▀▀▀▀▀█▀▀▀ªªº=%                 //
//                           ┴"┴┴┴┴┴`     ╙┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴^     "┴┴┴┴┴┴┴┴┴""""┴┴┴┘                    //
//                           """""""         `"""""""""""""""""                `"""""""""                     //
//                                                                                                            //
//                                                                             cuatroceronueve                //
//                                                                                                            //
//                                                                                                            //
//                                                                                                            //
//                                                                                                            //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./royalties/DefaultOperatorFilterer.sol";
import "./@rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./@rarible/royalties/contracts/LibPart.sol";
import "./@rarible/royalties/contracts/LibRoyaltiesV2.sol";

contract Mint409 is ERC721, Ownable, ReentrancyGuard, DefaultOperatorFilterer, RoyaltiesV2Impl {
    string public baseURI;       
    bytes32 private whitelistMerkleRoot;    
    uint256 [] private tokenMintedID;
    uint256 public tokenCount = 0;    
    uint256 immutable public maxSupply = 409;
    uint256 public salePrice = 0.00 ether;
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    struct token {
        uint tokenId;    
        address owner;
    }

    token [] public tokenMintedOwners;    
    mapping(address => bool) public claimed;
    mapping(address => uint256) public tokenAvatar;    

    event newTokenMinted(address indexed owner, uint256 id); 

    constructor(string memory initBaseURI) ERC721("409 AMIGOS", "AMIGO") {
        baseURI = initBaseURI;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
        public
        override
        onlyAllowedOperator
    {
        super.safeTransferFrom(from, to, tokenId, data);
    }

    function setRoyalties(uint _tokenId, address payable _royaltiesReceipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesReceipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        LibPart.Part[] memory _royalties = royalties[_tokenId];
        if(_royalties.length > 0) {
            return (_royalties[0].account, (_salePrice * _royalties[0].value)/10000);
        }
        return (address(0), 0);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }
        if(interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }
        return super.supportsInterface(interfaceId);
    }

    modifier isCorrectPayment(uint256 price, uint256 numberOfTokens) {
        require(
            price * numberOfTokens == msg.value,
            "Incorrect ETH value sent"
        );
        _;
    }   
    
    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(
                merkleProof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "Address does not exist in whitelist"
        );
        _;
    }

    function verifyMerkleTree(bytes32[] calldata merkleProof)
        public
        view
        returns (bool)
    {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

        return MerkleProof.verify(merkleProof, whitelistMerkleRoot, leaf);
    }

    function mint(bytes32[] calldata merkleProof, uint256 tokenId)
        public
        payable
        isValidMerkleProof(merkleProof, whitelistMerkleRoot)
        isCorrectPayment(salePrice, 1)
        nonReentrant
    {
        require(tokenCount <= maxSupply, "Maximum number of tokens allowed was reached (409)");
        require(!claimed[msg.sender], "Only one token is allowed per address");
        
        _mint(msg.sender, tokenId);
        
        tokenCount++;
        tokenMintedID.push(tokenId);
        tokenAvatar[msg.sender] = tokenId;

        token memory minting = token(tokenId, msg.sender);
        tokenMintedOwners.push(minting);

        if(owner() != msg.sender) 
            claimed[msg.sender] = true;
            
        emit newTokenMinted(msg.sender, tokenId); 
    }

    function transfer(address addressMint, uint256 tokenId)
        public        
        nonReentrant
    {
        require(tokenCount <= maxSupply, "Maximum number of tokens allowed was reached (409)"); 
        
        _mint(addressMint, tokenId);   

        tokenCount++;
        tokenMintedID.push(tokenId);
        tokenAvatar[addressMint] = tokenId;

        token memory minting = token(tokenId, addressMint);
        tokenMintedOwners.push(minting);

        emit newTokenMinted(addressMint, tokenId); 
    }
    
    function tokenURI(uint256 tokenId)
      public
      view
      virtual
      override
      returns (string memory)
    {
      require(_exists(tokenId), "Error: Query for nonexistent token");
      return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }
    
    function getListTokenID() public view returns (uint256 [] memory){
        return tokenMintedID;
    }

    function getListTokenOwners() public view returns (token [] memory){
        return tokenMintedOwners;
    }

    function setBaseURI(string memory updateBaseURI) public onlyOwner {
        baseURI = updateBaseURI;
    }

    function setWhitelistMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        whitelistMerkleRoot = merkleRoot;
    } 

    function setSalePrice(uint256 updateSalePrice) external onlyOwner {
        salePrice = updateSalePrice;
    }

    function infoContract() public view returns(address, uint256) {
        address addressContract = address(this);
        uint256 balanceContract = address(this).balance / 10**18;      
        return (addressContract, balanceContract);
    }

    function withdraw() public onlyOwner {
        uint256 balanceContract = address(this).balance;
        payable(msg.sender).transfer(balanceContract);
    }   
}