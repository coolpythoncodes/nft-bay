import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import polygonScanApiKey from "./secret.json";
import nftMarketPlaceAddress from "~/utils/data/NFTMarketPlace-address.json";
import { type AddressType } from "~/utils/@custom-types/typing";
import { polygonMumbai } from "@wagmi/chains";

export default defineConfig({
  out: "src/generated.ts",

  plugins: [
    etherscan({
      apiKey: polygonScanApiKey.polygonScanApiKey,
      chainId: polygonMumbai.id,
      contracts: [
        {
          name: "nftMarketPlace",
          address: nftMarketPlaceAddress.address as AddressType,
        },
      ],
    }),
    react(),
  ],
});

// NFTMarketPlace
