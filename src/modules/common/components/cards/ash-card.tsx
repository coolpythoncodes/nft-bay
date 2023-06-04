import React, { type ReactNode } from "react";

interface ICard {
  icon: ReactNode;
  title: string;
  description: string;
}

const AshCard = ({ icon, title, description }: ICard) => {
  return (
    <div className="lottery-hero how-con bg-[#f6f6f6] p-5 md:p-[50px]">
      <div className="ash-card-fav mb-5 flex h-[56px] w-[56px] items-center justify-center">
        {icon}
      </div>
      <p className="mb-[10px] text-xl font-bold uppercase text-[#0D3B54] md:text-2xl">
        {title}
      </p>
      <p className="text-base font-medium text-[#15324395] pb-[20px]">
        {description}
      </p>
    </div>
  );
};

export default AshCard;
