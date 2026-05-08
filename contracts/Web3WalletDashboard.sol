// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
========================================
WEB3 WALLET DASHBOARD CONTRACT
========================================
FITUR:
- Deposit ETH
- Transfer ETH
- Check Balance
- Owner Withdraw
- Event Logs
========================================
*/

contract Web3WalletDashboard {

    address public owner;

    event Deposit(
        address indexed sender,
        uint256 amount
    );

    event TransferETH(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    event Withdraw(
        address indexed owner,
        uint256 amount
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Not owner"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /*
    ========================================
    DEPOSIT ETH
    ========================================
    */
    function depositETH() external payable {
        require(
            msg.value > 10,
            "Amount must be > 10"
        );

        emit Deposit(
            msg.sender,
            msg.value
        );
    }

    /*
    ========================================
    TRANSFER ETH
    ========================================
    */
    function transferETH(
        address payable recipient
    ) external payable {

        require(
            msg.value > 0,
            "Invalid amount"
        );

        require(
            recipient != address(0),
            "Invalid recipient"
        );

        recipient.transfer(msg.value);

        emit TransferETH(
            msg.sender,
            recipient,
            msg.value
        );
    }

    /*
    ========================================
    CHECK CONTRACT BALANCE
    ========================================
    */
    function getContractBalance()
        external
        view
        returns(uint256)
    {
        return address(this).balance;
    }

    /*
    ========================================
    OWNER WITHDRAW
    ========================================
    */
    function ownerWithdraw(
        uint256 amount
    ) external onlyOwner {

        require(
            amount <= address(this).balance,
            "Insufficient balance"
        );

        payable(owner).transfer(amount);

        emit Withdraw(
            owner,
            amount
        );
    }

    /*
    ========================================
    RECEIVE ETH
    ========================================
    */
    receive() external payable {
        emit Deposit(
            msg.sender,
            msg.value
        );
    }
}
