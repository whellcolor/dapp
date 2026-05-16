import { BuyWidget } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "2409d98fbe42fa94fb7ba259d6cf58c9",
});

function Example() {
  return (
    <BuyWidget
      client={client}
      image={"https://whellcolor.github.io/dapp/awdevNFT.jpg"}
      name={"NFT"}
      currency={"USD"}
      chain={defineChain(56)}
      amount={"0.02"}
      receiverAddress={"0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88"}
      buttonLabel={"LOG"}
    />
  );
}
