// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Web3Miner {

    address public owner;

    uint256 public rewardPerSecond =
        0.000001 ether;

    struct Miner {
        bool mining;
        uint256 startTime;
        uint256 balance;
        uint256 totalClaimed;
    }

    mapping(address => Miner)
        public miners;

    event MiningStarted(
        address indexed user,
        uint256 time
    );

    event MiningStopped(
        address indexed user,
        uint256 reward
    );

    event RewardClaimed(
        address indexed user,
        uint256 amount
    );

    event Deposit(
        address indexed from,
        uint256 amount
    );

    event Withdraw(
        address indexed to,
        uint256 amount
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Not owner"
        );
        _;
    }

    // =========================
    // START MINING
    // =========================

    function startMining() external {

        Miner storage miner =
            miners[msg.sender];

        require(
            !miner.mining,
            "Already mining"
        );

        miner.mining = true;

        miner.startTime =
            block.timestamp;

        emit MiningStarted(
            msg.sender,
            block.timestamp
        );
    }

    // =========================
    // STOP MINING
    // =========================

    function stopMining() external {

        Miner storage miner =
            miners[msg.sender];

        require(
            miner.mining,
            "Not mining"
        );

        uint256 duration =
            block.timestamp -
            miner.startTime;

        uint256 reward =
            duration *
            rewardPerSecond;

        miner.balance += reward;

        miner.mining = false;

        emit MiningStopped(
            msg.sender,
            reward
        );
    }

    // =========================
    // CLAIM REWARD
    // =========================

    function claimReward() external {

        Miner storage miner =
            miners[msg.sender];

        uint256 amount =
            miner.balance;

        require(
            amount > 0,
            "No reward"
        );

        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        miner.balance = 0;

        miner.totalClaimed += amount;

        payable(msg.sender)
            .transfer(amount);

        emit RewardClaimed(
            msg.sender,
            amount
        );
    }

    // =========================
    // GET PENDING REWARD
    // =========================

    function getPendingReward(
        address user
    )
        public
        view
        returns(uint256)
    {

        Miner memory miner =
            miners[user];

        if(!miner.mining){
            return miner.balance;
        }

        uint256 duration =
            block.timestamp -
            miner.startTime;

        uint256 reward =
            duration *
            rewardPerSecond;

        return miner.balance + reward;
    }

    // =========================
    // CONTRACT DEPOSIT
    // =========================

    receive() external payable {

        emit Deposit(
            msg.sender,
            msg.value
        );

    }

    // =========================
    // OWNER WITHDRAW
    // =========================

    function ownerWithdraw(
        uint256 amount
    )
        external
        onlyOwner
    {

        require(
            address(this).balance >= amount,
            "Insufficient balance"
        );

        payable(owner)
            .transfer(amount);

        emit Withdraw(
            owner,
            amount
        );
    }

}
