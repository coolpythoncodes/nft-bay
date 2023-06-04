import { type AddressType } from "../@custom-types/typing";

export const formatWalletAddress = (address: AddressType) =>
	`${address?.substring(0, 5)}...${address?.substring(
		address.length,
		address.length - 5
	)}`;
