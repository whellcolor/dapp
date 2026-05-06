import { getContract } from "thirdweb";
import { ethereum } from "thirdweb/chains";
import { client } from "./client";

const contract = getContract({
  address: "0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",
  chain: ethereum,
  client,
});
