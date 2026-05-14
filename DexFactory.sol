// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DexFactory {

    address[] public allPairs;

    mapping(address => mapping(address => address))
    public getPair;

    event PairCreated(
        address token0,
        address token1,
        address pair
    );

    function createPair(
        address tokenA,
        address tokenB
    ) external returns(address pair){

        require(
            tokenA != tokenB,
            "IDENTICAL"
        );

        bytes memory bytecode =
            type(DexPair).creationCode;

        bytes32 salt =
            keccak256(
                abi.encodePacked(
                    tokenA,
                    tokenB
                )
            );

        assembly{
            pair := create2(
                0,
                add(bytecode,32),
                mload(bytecode),
                salt
            )
        }

        getPair[tokenA][tokenB]
            = pair;

        allPairs.push(pair);

        emit PairCreated(
            tokenA,
            tokenB,
            pair
        );
    }
}

contract DexPair{}
