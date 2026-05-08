const response = await fetch("https://api.thirdweb.com/v1/contracts/write", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-secret-key": "G8vNXJOMTp_TuTQV3kgFIQyKAz_L21F3a9SW57zKanPEqK7iGCHyTUcHKuujJR1q3G2h7d4VHaIlDeR3yn0Wjw",
  },
  body: JSON.stringify({
    calls: [
      {
        contractAddress: "0x7f4C2f7671e6817Bb01195d24e4eAfC94435f5d0",
        method:
          "function approve(address spender, uint256 value) returns (bool)",
        params: [spender, value],
      },
    ],
    chainId: 137,
    from: "0x18F0CC62ABA5C51Fc28070484821d4bea75Bd4cE",
  }),
});

const data = await response.json();
