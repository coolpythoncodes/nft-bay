import Image from "next/image";
import c1 from "../../../../../public/asset/hero/c1.jpg";
import c2 from "../../../../../public/asset/hero/c2.jpg";
import c3 from "../../../../../public/asset/hero/c3.jpg";
import { generalRoutes } from "~/utils/data";
import Link from "next/link";
import { Button, Carousel } from "antd";

const Hero = () => {
  return (
    <main className="layout-container">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between w-full h-full lg:min-h-[88vh]">
        <div className="mt-10 w-full lg:w-[53%]">
          <h1 className="mb-4 text-4xl font-bold capitalize text-[#0D3B54] md:text-5xl lg:mb-2 lg:text-[64px]">
            Create, sell and collect digital items.
          </h1>
          <p className="text-lg font-medium capitalize text-[#15324395]">
            Discover, buy, and collect unique digital assets on our innovative
            NFT marketplace. Explore a vast collection of one-of-a-kind digital
            items created by talented artists and creators. Own a piece of the
            digital revolution and showcase your exclusive collection to the
            world.
          </p>
          <div className="mb-10 mt-10 lg:mb-0">
            <Link
              href={generalRoutes.explore}
              className="text-base font-normal capitalize"
            >
              <div className="navbar">
                <Button>Explore</Button>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[90%] md:block md:w-[70%] lg:w-[40%]">
          <Carousel autoplay dots={false} infinite className="llg">
            <div className="hidden h-[50vh] sm:h-[55vh] w-[90%] md:relative md:block md:w-[70%] lg:h-[80vh] lg:w-[49%]">
              <Image
                src={c1}
                alt="hero"
                className="object-fill"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div className="hidden h-[50vh] sm:h-[55vh] w-[90%] md:relative md:block md:w-[70%] lg:h-[80vh] lg:w-[49%]">
              <Image
                src={c2}
                alt="hero"
                className="object-fill"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div className="hidden h-[50vh] sm:h-[55vh] w-[90%] md:relative md:block md:w-[70%] lg:h-[80vh] lg:w-[49%]">
              <Image
                src={c3}
                alt="hero"
                className="object-fill"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </main>
  );
};

export default Hero;
