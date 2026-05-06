import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
})

prepareTransaction({
  to: "0xd8519A8b8825Aa0DcC73aAD572f447FAE102fe88",
  value: toUnits("0.01", 18),
});
