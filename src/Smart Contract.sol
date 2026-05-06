// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FixedReward {
    address public owner;
    uint256 public rewardAmount = 0.9 ether;

    mapping(address => bool) public hasClaimed;

    constructor() {
        owner = msg.sender;
    }

    // Deposit ETH ke contract (biar ada dana reward)
    receive() external payable {}

    // Claim reward 0.9 ETH
    function claim() external {
        require(!hasClaimed[msg.sender], "Sudah klaim");
        require(address(this).balance >= rewardAmount, "Saldo tidak cukup");

        hasClaimed[msg.sender] = true;

        payable(msg.sender).transfer(rewardAmount);
    }

    // Owner isi saldo manual
    function fund() external payable {
        require(msg.value > 0, "Harus kirim ETH");
    }

    // Owner withdraw sisa dana
    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Bukan owner");
        payable(owner).transfer(amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgaraDApp {
    address public owner;

    mapping(address => uint256) public deposits;
    mapping(address => uint256) public rewards;

    event Deposited(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // ✅ Terima ETH
    function deposit() external payable {
        require(msg.value > 0, "Harus kirim ETH");

        deposits[msg.sender] += msg.value;

        // simulasi reward (misalnya 10%)
        rewards[msg.sender] += (msg.value * 10) / 100;

        emit Deposited(msg.sender, msg.value);
    }

    // ✅ Claim reward
    function claim() external {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "Tidak ada reward");

        rewards[msg.sender] = 0;

        payable(msg.sender).transfer(reward);

        emit Claimed(msg.sender, reward);
    }

    // ✅ cek balance contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // ✅ owner withdraw
    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Bukan owner");
        payable(owner).transfer(amount);
    }
}
