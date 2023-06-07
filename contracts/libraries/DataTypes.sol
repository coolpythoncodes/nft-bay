// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

library DataTypes {
    struct MarketItem {
        address payable nftOwner;
        uint price;
        bool listed;
        bool auction;
        uint auctionEndTime;
        address payable highestBidder;
        uint highestBid;
        uint itemId;
        uint tokenId;
    }
}