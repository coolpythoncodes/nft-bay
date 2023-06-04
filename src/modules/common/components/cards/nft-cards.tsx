import React from "react";
import CountdownTimer from "../countdown-timer/countTimer";
import c2 from "../../../../../public/asset/hero/c2.jpg";
import Image from "next/image";
import Link from "next/link";

export interface INft {
  id: number;
  title: string;
  ratio: string;
  amount: string;
  date?: string;
}

const Nft = ({ title, ratio, amount, date, id }: INft) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const targetDate = new Date(date!);
  return (
    <Link href={`/nft/${id}`} >
      <main className="winner bg-white">
        <div className="winner-inner">
          {date ? (
            <span className="draw-date">
              {<CountdownTimer targetDate={targetDate} />}
            </span>
          ) : null}
          <div className="border-red relative h-[294px] w-full border">
            <Image
              src={c2}
              alt="hero"
              className="object-fill"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="winner-content">
            <h4 className="text-base font-extrabold uppercase text-[#0D3B54]">
              {title}
            </h4>
            <p className="mt-2 text-base font-bold text-[#999]">
              {amount} ETH <span className="ml-4 text-[#0D3B54]">{ratio}</span>
            </p>
            <p className="mt-2 text-base font-semibold text-[#0D3B54]">
              Place a bid
            </p>
          </div>
        </div>
      </main>
    </Link>
  );
};

export default Nft;
