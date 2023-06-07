import React from "react";
import c2 from "../../../../../public/asset/hero/c2.jpg";
import Image from "next/image";
import CountdownTimer from "../../components/countdown-timer/countTimer";
import { Button } from "antd";

const IndividualNft = () => {
  const targetDate = new Date("2023-12-31T23:59:59");
  return (
    <main>
      <div className=" layout-container mb-20">
        <div className="w-full items-center justify-between md:flex mt-10">
          <div className="donation-goals-con md:block md:w-[47%] md:mb-0 mb-5">
            <div className="relative h-[50vh] w-full lg:h-[85vh]">
              <Image src={c2} alt="campaign" sizes="100%" fill />
            </div>
          </div>
          <div className="w-full md:w-[47%]">
            <p className="flex items-center justify-start text-base text-[#15324395]">
              Auctions ends in{" "}
              <span className="ml-2 font-bold text-[#0D3B54]">
                <CountdownTimer targetDate={targetDate} />
              </span>
            </p>
            <h1 className="my-3 text-2xl font-black capitalize text-[#0D3B54] md:text-3xl lg:text-4xl">
              Deep Sea Phantasy
            </h1>
            <p className="text-base font-normal text-[#15324395] md:text-lg ">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <div className="mt-5">
              <h2 className="text-base font-bold capitalize text-[#0D3B54] ">
                Bid
              </h2>
              <p className="m-0 p-0 text-lg font-normal text-[#15324395]">
                Bid accepted <span className="font-bold">0.005 ETH</span>
              </p>
              <p className="text-base font-normal text-[#15324395]">
                by{" "}
                <span className="font-bold">
                  1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                </span>{" "}
                <span className="font-[300]">at 6/15/2021, 3:20 AM</span>
              </p>
            </div>

            <div className="mt-5">
              <h2 className="text-base font-bold capitalize text-[#0D3B54] ">
                Price
              </h2>
              <p className="text-2xl font-bold capitalize text-[#0D3B54] md:text-3xl">
                0.059 ETH
              </p>
            </div>
            <div className="mb-20 mt-5 md:mb-0">
              <ul className="flex items-center gap-x-4 xl:gap-x-8">
                <li className="navbar">
                  <Button className="text-base font-normal capitalize">
                    Buy Now
                  </Button>
                </li>
                <li>
                  <Button className="btn-pok-2 text-base font-normal capitalize">
                    <span>Place a Bid</span>
                  </Button>
                </li>
              </ul>
            </div>
            {/* ) : null} */}
            {/* <WordsOfSupport {...{ campaignId, campaign }} /> */}
          </div>
        </div>
      </div>

      {/* <DonateModal
        showDonateModal={showDonateModal}
        onComplete={() => setShowDonateModal(!showDonateModal)}
        fundraiser={campaign?.fundraiser}
        campaignId={campaignId}
        campaign={campaign}
        setDonors={setDonors}
        setPercent={setPercent}
      /> */}
    </main>
  );
};

export default IndividualNft;
