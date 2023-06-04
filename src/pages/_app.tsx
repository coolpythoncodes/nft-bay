import { type AppType } from "next/dist/shared/lib/utils";
import { WagmiConfig } from "wagmi";
import Layout from "~/modules/common/components/layout";
import "~/styles/globals.css";
import { wagmiConfig } from "~/utils/config";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <div className="pt-[55px] md:pt-20">
          <Component {...pageProps} />
        </div>
      </Layout>
    </WagmiConfig>
  );
};

export default MyApp;
