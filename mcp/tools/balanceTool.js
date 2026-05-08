export const getBalanceTool = {
  name: "get_balance",

  description:
    "Get wallet token balances",

  inputSchema: {
    type: "object",
    properties: {
      address: {
        type: "string",
      },
    },
    required: ["address"],
  },
};
