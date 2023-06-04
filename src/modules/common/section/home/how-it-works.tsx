import React from "react";
import AshCard from "../../components/cards/ash-card";

import { TfiWallet } from "react-icons/tfi";
import { BiAddToQueue } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";

const How = () => {
  return (
    <section className="layout-container py-20">
      <div className="grid gap-y-[32px] grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
        <AshCard icon={<TfiWallet className="text-[30px] font-black text-white" />} title="Set up your wallet" description="fzsyibsicdns  suosis skhks sohff skiurt9e iw eow wfgier woruwrb whtsh uorw mxnsw qhwh wuywob ysirwowy usaobimloh k.ouerfif op;lhffs;'g kifla'fss kosjfosf khdfpfsfsafsjkhds skvsfkfsksfskdiwo" />
        <AshCard icon={<BiAddToQueue className="text-[30px] font-black text-white" />} title="Add your NFT's" description="fzsyibsicdns  suosis skhks sohff skiurt9e iw eow wfgier woruwrb whtsh uorw mxnsw qhwh wuywob ysirwowy usaobimloh k.ouerfif op;lhffs;'g kifla'fss kosjfosf khdfpfsfsafsjkhds skvsfkfsksfskdiwo" />
        <AshCard icon={<MdOutlineSell className="text-[30px] font-black text-white" />} title="Sell your NFT's" description="fzsyibsicdns  suosis skhks sohff skiurt9e iw eow wfgier woruwrb whtsh uorw mxnsw qhwh wuywob ysirwowy usaobimloh k.ouerfif op;lhffs;'g kifla'fss kosjfosf khdfpfsfsafsjkhds skvsfkfsksfskdiwo" />
      </div>
    </section>
  );
};

export default How;
