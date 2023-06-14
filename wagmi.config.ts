import { hardhat } from "@wagmi/cli/plugins";
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { nftMarketPlaceAbi, nftMarketPlaceAddress } from "~/utils/data";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      abi: nftMarketPlaceAbi.abi,
      address: nftMarketPlaceAddress,
      name: "NFTMarketPlace1",
    },
  ],
  plugins: [
    hardhat({
      project: "./",
      deployments: {
        address: nftMarketPlaceAddress,
      },
    }),
    react(),
  ],
});
