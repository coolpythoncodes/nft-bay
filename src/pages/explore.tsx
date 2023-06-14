import { type NextPage } from "next";
import Head from "next/head";
import { Explores } from "~/modules/common/section/explore";

const Explore: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT Bay | EXPLORE</title>
        <meta
          name="NFT Bay"
          content="NFT Bay is a decentralized marketplace that empowers users to create, sell, and auction Non-Fungible Tokens (NFTs).

NFT Bay enables creators to mint and showcase their unique NFT creations, while buyers can browse a diverse range of digital assets and securely transact using cryptocurrency.

Through its auction functionality, NFT Bay offers an exciting opportunity for users to participate in bidding wars and discover rare and exclusive NFTs.

With a focus on community, transparency, and innovation, NFT Bay aims to revolutionize the NFT ecosystem by fostering creativity, enabling fair value exchange, and empowering artists and collectors alike with royalties."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Explores />
    </>
  );
};

export default Explore;
