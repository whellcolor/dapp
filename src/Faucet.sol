// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(
        address to,
        uint256 amount
    ) external returns(bool);
}

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

contract AdvancedFaucet {

    address public owner;

    IERC20 public token;

    IERC721 public nft;

    uint256 public dripAmount =
        100 * 10**18;

    uint256 public ethAmount =
        0.0001 ether;

    uint256 public xpReward = 10;

    mapping(address => uint256)
        public lastClaim;

    mapping(address => uint256)
        public xp;

    mapping(address => uint256)
        public totalClaims;

    event Claimed(
        address indexed user,
        uint256 amount,
        uint256 xpReward
    );

    constructor(
        address _token,
        address _nft
    ) {

        owner = msg.sender;

        token = IERC20(_token);

        nft = IERC721(_nft);
    }

    modifier onlyOwner(){
        require(
            msg.sender == owner,
            "Not owner"
        );
        _;
    }

    function claim() external {

        require(
            block.timestamp >
            lastClaim[msg.sender] + 1 days,
            "Wait 24 hours"
        );

        lastClaim[msg.sender] =
            block.timestamp;

        totalClaims[msg.sender]++;

        xp[msg.sender] += xpReward;

        token.transfer(
            msg.sender,
            dripAmount
        );

        payable(msg.sender)
            .transfer(ethAmount);

        emit Claimed(
            msg.sender,
            dripAmount,
            xpReward
        );
    }

    function sendNFT(
        address user,
        uint256 tokenId
    ) external onlyOwner {

        nft.safeTransferFrom(
            address(this),
            user,
            tokenId
        );
    }

    function depositETH()
        external
        payable
    {}

    function withdrawETH()
        external
        onlyOwner
    {

        payable(owner)
            .transfer(
                address(this).balance
            );
    }
}
