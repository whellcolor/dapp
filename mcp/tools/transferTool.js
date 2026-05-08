export const transferTool = {
  name: "transfer_token",

  description:
    "Transfer token to another wallet",

  inputSchema: {
    type: "object",
    properties: {
      recipient: {
        type: "string",
      },
      amount: {
        type: "string",
      },
    },
    required: [
      "recipient",
      "amount",
    ],
  },
};
