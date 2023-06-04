import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/modules/common/components/layout";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <div className="pt-[55px] md:pt-20">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
};

export default MyApp;
