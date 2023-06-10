// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

library Events {
     event MarketItemCreated(
        uint indexed itemId,
        uint256 indexed tokenId,
        address payable creator,
        uint256 price
    );

    event MarketItemSold(
        uint indexed itemId,
        uint256 indexed tokenId,
        address payable seller,
        address payable buyer,
        uint256 price
    );

    event PlacedBid (
        uint indexed itemId,
        uint256 indexed tokenId,
        address  payable indexed bidder,
        uint256 price
    );

    event AuctionEnded (
        uint indexed itemId,
        uint256 indexed tokenId,
        address  payable indexed nftOwner,
        address  payable  highestBidder,
        uint256 price
    );

    event ResellNftItem(
        uint indexed itemId,
        uint256 indexed tokenId,
        address payable nftOwner,
        uint256 price
    );
}