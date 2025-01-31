// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.28;

import "./Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("D-Real Estate", "DRE") {}
  
  function mint(string memory _tokenURI) public returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    return newItemId;
  }

  function totalSupply() public view returns (uint256) {
    return _tokenIds.current();
  }
}