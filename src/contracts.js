import { ethers } from "ethers";

export const TOKEN_ADDRESS =
  "0xd8519a8b8825aa0dcc73aad572f447fae102fe88";

export const FAUCET_ADDRESS =
  "0xd8519a8b8825aa0dcc73aad572f447fae102fe88";

export const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
];

export const FAUCET_ABI = [
  "function requestTokens()",
  "function canClaim(address) view returns (bool)",
  "function remainingAllowance(address) view returns (uint256)",
];
