/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from "react";
import Nft from "../../components/cards/nft-cards";
import useWindowSize from "~/utils/hook/useWindowSize.hook";
import { Button, Carousel } from "antd";
import { generalRoutes, nftItems } from "~/utils/data";
import Link from "next/link";

const NewItems = () => {
  const { width } = useWindowSize();
  const carouselCount = useMemo(() => {
    if (width! <= 600) {
      return 1;
    }
    if (width! >= 600 && width! < 992) {
      return 2;
    }
    if (width! >= 992 && width! < 1500) {
      return 3;
    }
    return 4;
  }, [width]);

  return (
    <section className="layout-container pb-20">
      <h1 className="text-center text-3xl font-bold text-[#0D3B54] md:text-5xl pb-5">
        New Items
      </h1>
      <Carousel slidesToShow={carouselCount} autoplay dots={false}>
          {nftItems.slice(0, 6).map((item) => (
            <Nft
              key={item.id}
              id={item.id}
              title={item.title}
              ratio={item.ratio}
              amount={item.amount}
              date={item.date}
            />
          ))}
        </Carousel>
        <div className="mt-10 flex w-full justify-end">
          <Link href={generalRoutes.explore} className="navbar">
            <Button>
              See More
            </Button>
          </Link>
        </div>
    </section>
  );
};

export default NewItems;
