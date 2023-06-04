import { polygon, bscTestnet, sepolia, evmosTestnet } from "@wagmi/chains";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { env } from "~/env.mjs";

const { chains, publicClient } = configureChains([sepolia,polygon,bscTestnet,evmosTestnet], [publicProvider()])

const wagmiConfig = createConfig({
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID,
        metadata: {
          name: "Nft bay",
          description: "An nft marketplace with royalties for creators",
          url: "https://wagmi.sh",
          icons: ["https://wagmi.sh/icon.png"],
        },
      },
    }),
  ],
  publicClient,
});

export {
    wagmiConfig
}