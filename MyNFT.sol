// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {

    uint256 public tokenId;

    address public owner =
        0xd8519a8b8825aa0dcc73aad572f447fae102fe88;

    constructor()
    ERC721("MyNFT", "MNFT") {}

    function mint() public payable {

        require(
            msg.value >= 0.01 ether,
            "Not enough ETH"
        );

        tokenId++;

        _safeMint(msg.sender, tokenId);
    }

    function withdraw() public {

        require(
            msg.sender == owner,
            "Not owner"
        );

        payable(owner).transfer(
            address(this).balance
        );
    }
}
