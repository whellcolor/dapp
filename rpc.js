// Example: Get latest block number on Ethereum
const res = await fetch(
  "https://1.rpc.thirdweb.com/e6230839e78c90a670b64b1f26c0b3d8",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: 1,
    }),
  },
);
const data = await res.json();
console.log("Latest block number:", parseInt(data.result, 16));
