import React from "react";
import { Button, List, Tabs, type TabsProps } from "antd";

import { generalRoutes, nftItems } from "~/utils/data";
import Nft from "../../components/cards/nft-cards";
import Link from "next/link";

const MyDashboard = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "All Campaigns",
      children: (
        <List
          grid={{
            gutter: 20,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={nftItems}
          renderItem={(item) => (
            <List.Item className="">
              <Nft
                key={item.id}
                id={item.id}
                title={item.title}
                ratio={item.ratio}
                amount={item.amount}
                date={item.date}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "2",
      label: "My active Campaigns",
      children: (
        <List
          grid={{
            gutter: 20,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={nftItems}
          renderItem={(item) => (
            <List.Item className="">
              <Nft
                key={item.id}
                id={item.id}
                title={item.title}
                ratio={item.ratio}
                amount={item.amount}
                date={item.date}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "3",
      label: "My  ended Campaigns",
      children: (
        <List
          grid={{
            gutter: 20,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={nftItems}
          renderItem={(item) => (
            <List.Item className="">
              <Nft
                key={item.id}
                id={item.id}
                title={item.title}
                ratio={item.ratio}
                amount={item.amount}
                date={item.date}
              />
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <main className="bg-[#FCFCFC]">
      <div className="layout-container mb-10">
        <div className="flex w-full items-center justify-between py-2 md:py-10">
          <Link href={generalRoutes.createNft} className="ml-auto navbar">
            <Button className="grid-cols mb-6 mt-6 h-[50px] w-[151px] border-none bg-[#FF6B00] text-base text-white lg:mb-0 lg:mt-6">
              Create Nft
            </Button>
          </Link>
        </div>

        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </main>
  );
};

export default MyDashboard;
