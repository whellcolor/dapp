import { createThirdwebClient } from "thirdweb";
import { facilitator, settlePayment } from "thirdweb/x402";
import { arbitrumSepolia } from "thirdweb/chains";

const client = createThirdwebClient({ secretKey: "Hs2PxCHRqJhJDgosj_34swOVxNELj3wLScpCELckqgYJ8j-MMhk2PdOQPK5lxtExMk5wKNduLfd-obBCaDoxmQ" });

const thirdwebX402Facilitator = facilitator({
  client,
  serverWalletAddress: "0x18F0CC62ABA5C51Fc28070484821d4bea75Bd4cE",
});

export async function GET(request: Request) {
  // process the payment
  const result = await settlePayment({
    resourceUrl: "https://api.example.com/premium-content",
    method: "GET",
    paymentData: request.headers.get("x-payment"),
    network: arbitrumSepolia,
    price: "$0.01",
    facilitator: thirdwebX402Facilitator,
  });

  if (result.status === 200) {
    // Payment successful, continue to app logic
    return Response.json({ data: "premium content" });
  } else {
    return Response.json(result.responseBody, {
      status: result.status,
      headers: result.responseHeaders,
    });
  }
}
