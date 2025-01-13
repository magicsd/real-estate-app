// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
  function transferFrom(
    address _from,
    address _to,
    uint256 _id
  ) external;
}

contract Escrow {
  address public nftAddress;
  address payable public seller;
  address public inspector;
  address public lender;

  mapping(uint256 => bool) public isListed;
  mapping(uint256 => uint256) public purchasePrice;
  mapping(uint256 => uint256) public escrowAmount;
  mapping(uint256 => address) public buyer;
  mapping(uint256 => bool) public inspectionPassed;

  modifier onlySeller() {
    require(msg.sender == seller, "Only seller can call this method");
    _;
  }

  modifier onlyBuyer(uint256 _nftID) {
    require(msg.sender == buyer[_nftID], "Only buyer can call this method");
    _;
  }

  modifier onlyInspector() {
    require(msg.sender == inspector, 'Only inspector can call this method');
    _;
  }

  constructor(
    address _nftAddress,
    address payable _seller,
    address _inspector,
    address _lender
  ) {
    nftAddress = _nftAddress;
    seller = _seller;
    inspector = _inspector;
    lender = _lender;
  }

  function list(
    uint256 _nftID, 
    address _buyer, 
    uint256 _purchasePrice,
    uint256 _escrowAmount
    ) public payable onlySeller {
      IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

      isListed[_nftID] = true;
      buyer[_nftID] = _buyer;
      purchasePrice[_nftID] = _purchasePrice;
      escrowAmount[_nftID] = _escrowAmount;
  }

  function depositEarnest(uint256 _nftID) public payable onlyBuyer(_nftID) {
    require(msg.value >= escrowAmount[_nftID], "Earnest is less than escrow amount");
  }

  function updateInspectionStatus(uint _nftID, bool _isPassed) public onlyInspector {
    inspectionPassed[_nftID] = _isPassed;
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}