// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Farming {

    mapping(address => uint256)
    public staked;

    mapping(address => uint256)
    public rewards;

    function stake(
        uint256 amount
    ) external {

        staked[msg.sender]
            += amount;
    }

    function claimReward()
        external
    {

        rewards[msg.sender]
            += 10 ether;
    }
}
