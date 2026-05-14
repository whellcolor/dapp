// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTReward is ERC721 {

    uint256 public tokenId;

    constructor()
    ERC721("DEX NFT","DNFT")
    {}

    function mintReward(
        address to
    ) external {

        _mint(to, tokenId++);

    }
}
