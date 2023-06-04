import { type NextPage } from "next";
import Head from "next/head";
import { Explores } from "~/modules/common/section/explore";

const Explore: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT | EXPLORE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Explores />
    </>
  );
};

export default Explore;