import { type AddressType } from "../@custom-types/typing";
import { ethers } from "ethers";

export const formatWalletAddress = (address: AddressType) =>
  `${address?.substring(0, 5)}...${address?.substring(
    address.length,
    address.length - 5
  )}`;

export const toWei = (num:number) => ethers.utils.parseEther(num.toString());
// const fromWei = (num) => ethers.utils.formatEther(num);
