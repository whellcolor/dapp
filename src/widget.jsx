import {
  BridgeWidget,
  CheckoutWidget,
  SwapWidget,
  TransactionWidget,
} from "thirdweb/react";

import { prepareTransaction, toUnits } from "thirdweb";
import { ethereum, arbitrum } from "thirdweb/chains";
import { agaraClient } from "./agaraClient";

export default function AgaraWidgets() {
  return (
    <div style={{ marginTop: "20px", display: "grid", gap: "20px" }}>
      
      <BridgeWidget client={agaraClient} theme="dark" />

      <SwapWidget
        client={agaraClient}
        prefill={{
          buyToken: { chainId: 8453 },
          sellToken: { chainId: 137 },
        }}
      />

      <CheckoutWidget
        client={agaraClient}
        chain={arbitrum}
        amount="0.9"
        seller="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88"
      />

      <TransactionWidget
        client={agaraClient}
        transaction={prepareTransaction({
          to: "0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",
          chain: ethereum,
          client: agaraClient,
          value: toUnits("0.9", 18),
        })}
      />
    </div>
  );
}
