import { polygonMumbai } from "@wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { env } from "~/env.mjs";
import { configureChains, createConfig } from "wagmi";

const chains = [polygonMumbai];

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID }),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID,
    version: 1,
    chains,
  }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export { wagmiConfig, ethereumClient };
