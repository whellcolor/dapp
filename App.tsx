// 1. Install dependencies via terminal:
// npm install thirdweb

// 2. Kode utama (App.tsx atau App.jsx)
import React from "react";
import {
  ThirdwebProvider,
  ConnectButton,
  useActiveAccount,
  useBalance,
} from "thirdweb/react";
import { ethereum } from "thirdweb/chains";

const ETH_ADDRESS = "0x5e8bade6e0bce65807db6327cb1d9eeb7c6a6a5b";
const USDC_ADDRESS = "0xd8519a8b8825aa0dcc73aad572f447fae102fe88";
const USDT_ADDRESS = "0x5e8bade6e0bce65807db6327cb1d9eeb7c6a6a5b";

function Balances() {
  const account = useActiveAccount();
  const eth = useBalance({
    address: account?.address,
    tokenAddress: ETH_ADDRESS,
  });
  const usdc = useBalance({
    address: account?.address,
    tokenAddress: USDC_ADDRESS,
  });
  const usdt = useBalance({
    address: account?.address,
    tokenAddress: USDT_ADDRESS,
  });

  if (!account) return <div>Hubungkan wallet untuk melihat saldo.</div>;
  return (
    <div>
      <div>
        <strong>Address:</strong> {account.address}
      </div>
      <div>
        <strong>ETH:</strong> {eth.data?.displayValue || 10} ETH
      </div>
      <div>
        <strong>USDC:</strong> {usdc.data?.displayValue || 10} USDC
      </div>
      <div>
        <strong>USDT:</strong> {usdt.data?.displayValue || 10} USDT
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider clientId="Hs2PxCHRqJhJDgosj_34swOVxNELj3wLScpCELckqgYJ8j-MMhk2PdOQPK5lxtExMk5wKNduLfd-obBCaDoxmQ" activeChain={ethereum}>
      <h2>DApp Web3 Simple - Saldo ETH, USDC, USDT</h2>
      <ConnectButton />
      <Balances />
    </ThirdwebProvider>
  );
}
// 3. Jangan lupa ganti "YOUR_CLIENT_ID" dengan Client ID dari dashboard thirdweb Anda.
// 4. Jalankan aplikasi dengan npm run dev atau npm start.
