import React from "react";
import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Link from "next/link";

import { navlinks } from "~/utils/data";
import { useRouter } from "next/router";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <nav
      className={`navbar-boxshadow fixed ${
        router.pathname === "/" ? "bg-[white]" : "ash-card-fav"
      }  navbar`}
    >
      <div className="layout-container flex h-[55px] items-center justify-between md:h-20">
        <Link
          href="/"
          className="text-base font-bold leading-[41px] md:text-[32px] "
        >
          <div className="flex items-center justify-start">
            <div className="bg-[#f44a33] p-[4px]">
              <h1 className="text-2xl font-bold text-white">NFT</h1>
            </div>{" "}
            <div className="logo-line" />{" "}
            <p
              className={`m-0 text-2xl font-bold  ${
                router.pathname === "/" ? "text-black" : "text-white"
              } `}
            >
              BAY
            </p>
          </div>
        </Link>
        <div className="hidden items-center gap-x-4 lg:flex xl:gap-x-8">
          <ul className="flex items-center gap-x-4 xl:gap-x-8">
            {navlinks.map((item, index) => (
              <li key={`navlinks-${index}`}>
                <Link
                  href={item.to}
                  className={`text-lg font-medium capitalize ${
                    router.pathname === "/" ? "text-[#15324395]" : "text-white"
                  } hover:text-[#E8AE3D]`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Button>Connect Wallet</Button>
            </li>
          </ul>
        </div>
        <MenuOutlined
          onClick={showDrawer}
          className={`${
            router.pathname === "/" ? "text-black" : "text-white"
          } lg:hidden `}
        />
      </div>
      {/* ------------------  mobile side bar -----------------------  */}
      <Drawer
        placement="left"
        {...{ onClose, open }}
        headerStyle={{ background: "#242526" }}
        bodyStyle={{ background: "#242526" }}
        closable={false}
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="bg-[#f44a33] p-[4px]">
                <h1 className="text-2xl font-bold text-white">NFT</h1>
              </div>{" "}
              <div className="logo-line " />{" "}
              <p className="m-0 text-2xl font-bold text-white">BAY</p>
            </div>
            <CloseOutlined
              onClick={onClose}
              className=" text-2xl font-black text-white"
            />
          </div>
        }
        className="navbar-mobile"
      >
        <ul className="mb-10 flex flex-col gap-y-5 text-base font-normal capitalize leading-[19px] text-white">
          {navlinks.map((item, index) => (
            <li key={`mobile-navlinks-${index}`}>
              <Link
                href={item.to}
                className="text-lg font-medium capitalize text-[#fff] hover:text-[#E8AE3D]"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Button className="mr-5">Connect Wallet</Button>
          </li>
        </ul>
      </Drawer>
    </nav>
  );
};

export default Navbar;
