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
        <div className="w-full items-start justify-between md:flex">
          <div className="donation-goals-con hidden md:block md:w-[47%]">
            <div className="relative h-[50vh] w-full lg:h-[85vh]">
              <Image src={c2} alt="campaign" sizes="100%" fill />
            </div>
          </div>
          <div className="w-full pt-[70px] md:w-[47%]">
            <p className="flex items-center justify-start text-base text-[#999]">
              Auctions ends in{" "}
              <span className="ml-2 font-bold text-[#0D3B54]">
                <CountdownTimer targetDate={targetDate} />
              </span>
            </p>
            <h1 className="my-3 text-2xl font-black capitalize text-[#0D3B54] md:text-3xl lg:text-4xl">
              Deep Sea Phantasy
            </h1>
            {/* <div className="flex items-center justify-between "></div> */}
            <p className="text-base font-normal text-[#999] md:text-lg ">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <div className="mb-4 block md:hidden">
              {/* <Goals {...{ campaign, campaignId }} /> */}
              shift
            </div>

            <div className="donate-btn-container flex w-full items-center justify-between border-b border-[#D0D5DD] pb-10">
              {/* {campaign?.fundraiser?.toLowerCase() ===
              account?.toLowerCase() ? (
                <Button
                  className="h-[50px] w-[47%] border-none bg-[#FF6B00] text-base text-white"
                  disabled={!hasCampaignEnded(endAt) && campaign?.claimed}
                  onClick={handleWithdrawal as VoidFunction}
                >
                  Withdraw
                </Button>
              ) : (
                <Button
                  className="h-[50px] w-[47%] border-none bg-[#FF6B00] text-base text-white"
                  onClick={() => setShowDonateModal(true)}
                >
                  Donate
                </Button>
              )}

              <Button
                onClick={handleMint}
                disabled={isMinting}
                className="mint-btn h-[50px] w-[47%] border-2 border-[#FF6B00] bg-[#FCFCFC] text-base text-[black]"
              >
                Mint
              </Button> */}
              hello
            </div>
            {/* <Organisers
              fundraiser={campaign.fundraiser}
              location={campaign.location}
            /> */}
            <p>hi</p>
            {/* {campaign?.fundraiser.toLowerCase() === account?.toLowerCase() ? (
              <div className="mt-5 font-bold">
                <h1>Share Updates about the campaign</h1>
                <form onSubmit={handleSubmit} className="mt-5">
                  <textarea
                    name="campaignUpdate"
                    placeholder="Share Updates about the campaign"
                    required
                    className="mt-4 w-full"
                    onChange={(e) => setCampaignUpdateText(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 h-[50px] w-full border-none bg-[#FF6B00] text-base text-white"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : null} */}
            {/* {campaignUpdates.length > 0 ? ( */}
            <div className="mt-5">
              <h1 className="mb-3 text-xl font-bold">Updates 3</h1>
              <h1 className="mb-3 text-xl font-bold">Updates 3</h1>
              <h1 className="mb-3 text-xl font-bold">Updates 3</h1>
              <h1 className="mb-3 text-xl font-bold">Updates 3</h1>
              <h1 className="mb-3 text-xl font-bold">Updates 3</h1>
              <h1 className="mb-3 text-xl font-bold">Updates 3</h1>
              <div className="space-y-5">
                {/* {campaignUpdates?.map((item, index) => (
                    <div key={`campaign-updates-${index}`}>
                      <div className="mb-3 flex items-center gap-x-2">
                        <p className="font-bold">
                          {covertToReadableDate(
                            formatUnit(item?.timestamp) * 10 ** 18
                          ) ? (
                            <ReactTimeAgo
                              date={
                                formatUnit(item?.timestamp) * 10 ** 18 * 1000
                              }
                            />
                          ) : null}{" "}
                        </p>
                        <p>by {campaign?.fundraiser}</p>
                      </div>
                      <p className="whitespace-pre-wrap">{item?.description}</p>
                    </div>
                  ))} */}
              </div>
            </div>
            <div className="mb-20 mt-10 md:mb-0">
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
