// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPair {

    function swap(
        uint amount0Out,
        uint amount1Out
    ) external;
}

contract DexRouter {

    function swapExactTokensForTokens(
        address pair,
        uint amount0Out,
        uint amount1Out
    ) external {

        IPair(pair).swap(
            amount0Out,
            amount1Out
        );
    }
}
