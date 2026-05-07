import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

function App() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>DApp React</h1>

      {!isConnected ? (
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      )}
    </div>
  )
}

export default App

import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

const { sendTransaction } = useSendTransaction()

<button
  onClick={() =>
    sendTransaction({
      to: '0x171b9f078bc82f8be12c94a4de09cbe3051b1ea7',
      value: parseEther('0.01'),
    })
  }
>
  Kirim 0.01 ETH
</button>


import { useWriteContract } from 'wagmi'

const { writeContract } = useWriteContract()

<button
  onClick={() =>
    writeContract({
      address: '0x171b9f078bc82f8be12c94a4de09cbe3051b1ea7',
      abi,
      functionName: 'claim'
    })
  }
>
  Claim Reward
</button>
import {
  BridgeWidget,
  CheckoutWidget,
  SwapWidget,
  TransactionWidget,
} from "thirdweb/react";

import { prepareTransaction, toUnits } from "thirdweb";
import { ethereum, arbitrum, polygon, base } from "thirdweb/chains";
import { agaraClient } from "./agaraClient";

export default function AgaraWidgets() {
  return (
    <div style={{ marginTop: 20, display: "grid", gap: 20 }}>

      {/* BRIDGE */}
      <BridgeWidget 
        client={agaraClient} 
        theme="dark" 
      />

      {/* SWAP */}
      <SwapWidget
        client={agaraClient}
        prefill={{
          buyToken: {
            chainId: base.id,   // ✅ harus pakai chain object
          },
          sellToken: {
            chainId: polygon.id,
          },
        }}
      />

      {/* CHECKOUT */}
      <CheckoutWidget
        client={agaraClient}
        chain={arbitrum}
        amount="0.9"
        seller="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88"
      />

      {/* TRANSACTION */}
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
import { TokenProvider, TokenName } from "thirdweb/react";

<TokenProvider
  address="0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88"
  client={client}
  chain={ethereum}
>
  <TokenName />
</TokenProvider>
    

import { ThirdwebProvider } from "thirdweb/react";
import { agaraClient } from "./agaraClient";

<ThirdwebProvider client={agaraClient}>
  <App />
</ThirdwebProvider>

import { ConnectButton } from "thirdweb/react";
import { client } from "./client";

import NFTGallery from "./components/NFTGallery";
import MintNFT from "./components/MintNFT";

export default function App() {
  return (
    <div className="min-h-screen p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Agara NFT Marketplace
        </h1>

        <ConnectButton client={client} />
      </div>

      <MintNFT />

      <NFTGallery />
    </div>
  );
}
        
