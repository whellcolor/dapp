import { CONFIG } from "./config.js";
import { ABI } from "./contract.js";

let provider, signer, contract;
let mining = false;
let seconds = 0;
let timerInterval;

// =========================
// INIT RPC
// =========================

async function initRPC() {
  provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  console.log("RPC READY");
}

// =========================
// CONNECT WALLET
// =========================

async function connectWallet() {
  if (!window.ethereum) return alert("Install MetaMask");

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  signer = await provider.getSigner();

  contract = new ethers.Contract(
    CONFIG.CONTRACT_ADDRESS,
    ABI,
    signer
  );

  document.getElementById("wallet").innerText =
    await signer.getAddress();

  console.log("Wallet connected");
}

// =========================
// START MINING
// =========================

async function startMining() {
  if (!contract) return alert("Connect wallet first");

  await contract.startMining();
  mining = true;

  timerInterval = setInterval(() => {
    seconds++;

    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    document.getElementById("timer").innerText =
      `${h}:${m}:${s}`;
  }, 1000);
}

// =========================
// STOP MINING
// =========================

async function stopMining() {
  if (!contract) return;

  await contract.stopMining();
  mining = false;
  clearInterval(timerInterval);
}

// =========================
// CLAIM REWARD
// =========================

async function claimReward() {
  if (!contract) return;

  const tx = await contract.claimReward();
  await tx.wait();

  alert("Reward Claimed");
}

// =========================
// MINT NFT
// =========================

async function mintNFT() {
  if (!contract) return;

  await contract.mint(
    await signer.getAddress(),
    "ipfs://metadata.json"
  );

  alert("NFT Minted");
}

// =========================
// WITHDRAW
// =========================

async function withdraw(amountEth) {
  if (!signer) return;

  const tx = await signer.sendTransaction({
    to: CONFIG.CONTRACT_ADDRESS,
    value: ethers.parseEther(amountEth)
  });

  await tx.wait();
  alert("Withdraw Success");
}
