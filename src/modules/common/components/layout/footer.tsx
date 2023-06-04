import Link from "next/link";
import { navlinks } from "~/utils/data";

const Footer = () => {
  return (
    <footer className="py-5">
      <div className="layout-container flex items-center justify-between">
        <Link
          href="/"
          className="font-space text-base font-bold leading-[41px] md:text-[32px] "
        >
          <div className="flex items-center justify-start">
            <div className="bg-[#f44a33] p-[4px]">
              <h1 className="text-2xl font-bold text-black">NFT</h1>
            </div>{" "}
            <div className="logo-line" />{" "}
            <p className="m-0 text-2xl font-bold text-white">BAY</p>
          </div>
        </Link>
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:gap-x-8">
          {navlinks.map((item, index) => (
            <li key={`navlinks-${index}`}>
              <Link
                href={item.to}
                className="text-lg font-medium capitalize text-white hover:text-[#E8AE3D]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
