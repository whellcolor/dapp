import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {
  createThirdwebClient,
  getContract,
  defineChain,
  Engine,
} from "thirdweb";

import { transfer } from "thirdweb/extensions/erc20";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

const wallet = Engine.serverWallet({
  client,
  address: "0x5E8Bade6E0BCe65807dB6327cB1D9EEb7C6A6A5B",
});

app.post("/transfer", async (req, res) => {
  try {
    const { tokenAddress, recipient, amount } = req.body;

    const transaction = transfer({
      contract: getContract({
        client,
        address: tokenAddress,
        chain: defineChain(1),
      }),
      to: recipient,
      amount,
    });

    const result = await wallet.enqueueTransaction({
      transaction,
    });

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3001");
});
