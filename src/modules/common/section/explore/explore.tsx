import React from "react";
import { nftItems } from "~/utils/data";
import Nft from "../../components/cards/nft-cards";

const Explores = () => {
  return (
    <section>
      <div className="ash-card-fav">
        <div className="layout-container py-10 md:py-20">
          <h1 className="text-center text-3xl font-bold text-[#fff] md:text-5xl">
            Explore
          </h1>
          <p className="mt-2 text-center text-xl text-[#fff]">
          &quot;Explore the vast collection of NFTs in the marketplace, where digital art, collectibles, and unique assets come to life on the blockchain.&quot;
        </p>
        </div>
      </div>
      <div className="layout-container py-10 md:py-20">
        <div className="grid grid-cols-1 gap-y-[32px] md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
          {nftItems.map((item) => (
            <Nft
              key={item.id}
              id={item.id}
              title={item.title}
              ratio={item.ratio}
              amount={item.amount}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explores;
