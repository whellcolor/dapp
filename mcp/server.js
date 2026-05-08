import dotenv from "dotenv";

dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import {
  StdioServerTransport,
} from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { getBalanceTool } from "./tools/balanceTool.js";
import { transferTool } from "./tools/transferTool.js";
import { walletInfoTool } from "./tools/walletTool.js";

const server = new Server(
  {
    name: "web3-wallet-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(
  ListToolsRequestSchema,
  async () => ({
    tools: [
      getBalanceTool,
      transferTool,
      walletInfoTool,
    ],
  })
);

server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {

    const { name, arguments: args } =
      request.params;

    if (name === "wallet_info") {

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              wallet:
                "0x5E8Bade6E0BCe65807dB6327cB1D9EEb7C6A6A5B",
            }),
          },
        ],
      };
    }

    if (name === "get_balance") {

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              eth: "10.5",
              usdc: "500",
              usdt: "300",
            }),
          },
        ],
      };
    }

    if (name === "transfer_token") {

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              recipient: args.recipient,
              amount: args.amount,
            }),
          },
        ],
      };
    }

    throw new Error("Tool not found");
  }
);

const transport =
  new StdioServerTransport();

await server.connect(transport);
