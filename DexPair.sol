// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DexPair {

    address public token0;
    address public token1;

    uint112 private reserve0;
    uint112 private reserve1;

    mapping(address => uint256)
    public liquidity;

    function addLiquidity(
        uint amount0,
        uint amount1
    ) external {

        reserve0 += uint112(amount0);
        reserve1 += uint112(amount1);

        liquidity[msg.sender]
            += amount0 + amount1;
    }

    function swap(
        uint amount0Out,
        uint amount1Out
    ) external {

        require(
            amount0Out > 0 ||
            amount1Out > 0,
            "INSUFFICIENT"
        );
    }
}
