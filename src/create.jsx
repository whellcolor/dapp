import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  secretKey: "G8vNXJOMTp_TuTQV3kgFIQyKAz_L21F3a9SW57zKanPEqK7iGCHyTUcHKuujJR1q3G2h7d4VHaIlDeR3yn0Wjw", // Use secret key if using on the server, get it from dashboard settings
});

import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientKey: "3ea7634968af4a7c90b17914bcf7d4bb", // Use client id if using on the client side, get it from dashboard settings
});


function AccountBlobbie(
  props: Omit<BlobbieProps, "address">,
): Element;
import {
  AccountProvider,
  AccountAvatar,
  AccountName,
  AccountAddress,
} from "thirdweb/react";

<AccountProvider address="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88" client={client}>
  <AccountAvatar />
  <AccountName />
  <AccountAddress />
</AccountProvider>;

import { Blobbie } from "thirdweb/react";

<Blobbie address="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88" className="w-10 h-10" />;

import { SocialIcon } from "thirdweb/react";

<SocialIcon provider="google" />;

import {
  WalletProvider,
  WalletIcon,
  WalletName,
} from "thirdweb/react";

<WalletProvider id="io.metamask">
  <WalletIcon />
  <WalletName />
</WalletProvider>;

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

const client = createThirdwebClient({ clientId: "3ea7634968af4a7c90b17914bcf7d4bb" });

<ConnectButton client={client} />;


import { getContract } from "thirdweb";
import {
  NFTProvider,
  NFTMedia,
  NFTDescription,
  NFTName,
} from "thirdweb/react";

const contract = getContract({
  address: "0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",
  chain: ethereum,
  client: yourThirdwebClient,
});

<NFTProvider contract={contract} tokenId={0n}>
  <NFTMedia />
  <NFTDescription />
  <NFTName />
</NFTProvider>;


import { TokenProvider, TokenIcon, TokenName  } from "thirdweb/react";
import { ethereum } from "thirdweb/chains";

<TokenProvider address="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88" client={...} chain={ethereum}>
  <TokenIcon />
  <TokenName />
</TokenProvider>
import { AccountProvider, AccountAddress } from "thirdweb/react";

<AccountProvider
  address="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88"
  client={TW_CLIENT}
>
  <AccountAddress />
</AccountProvider>;


import { ethereum } from "thirdweb/chains";

<BuyWidget
  client={client}
  chain={ethereum}
  amount="0.1" // in native tokens (ie. ETH)
/>;
