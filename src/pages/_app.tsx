import { Web3Modal } from "@web3modal/react";
import { type AppType } from "next/dist/shared/lib/utils";
import { WagmiConfig } from "wagmi";
import { env } from "~/env.mjs";
import Layout from "~/modules/common/components/layout";
import "~/styles/globals.css";
import { ethereumClient, wagmiConfig } from "~/utils/config";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Layout>
          <div className="pt-[55px] md:pt-20 min-h-screen">
            <Component {...pageProps} />
          </div>
        </Layout>
      </WagmiConfig>
      <Web3Modal projectId={env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID} ethereumClient={ethereumClient} />
    </>
  );
};

export default MyApp;
