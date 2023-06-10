// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import {DataTypes} from "./libraries/DataTypes.sol";
import {Events} from "./libraries/Events.sol";
import {ErrPriceZero, ErrListingFee, ErrAuctionStartTimeWrong, ErrItemListed, ErrHasNotAuctionEnded, ErrInvalidCaller, ErrAuctionEndTimeWrong, ErrPriceNotEqual, ErrItemNotListed, ErrItemIsAuction, ErrInvalidBid, ErrAuctionEnded,ErrTokenExists} from "./libraries/Error.sol";

contract NFTMarketPlace is
    ERC721,
    ERC721URIStorage,
    ERC721Royalty,
    Ownable,
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    // itemsIds is used to keep track of all items created
    Counters.Counter private itemsIds;
    Counters.Counter private soldIds;

    uint public listingFee = 0.01 ether;
    uint96 public feeNumerator = 5;

    mapping(uint => DataTypes.MarketItem) public nfts;

    constructor() ERC721("NFT Bay", "NFTB") {}

    function createNftToken(
        string calldata _tokenURI,
        uint price,
        // uint _tokenId,
        bool _listed,
        bool _auction,
        uint _auctionEndTime
    ) external payable returns (uint) {
        tokenIds.increment();

        uint newItemId = tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        _setTokenRoyalty(newItemId, msg.sender, feeNumerator);

        createMarketItem(price, newItemId, _listed, _auction, _auctionEndTime);
        return newItemId;
    }

    function createMarketItem(
        uint price,
        uint _tokenId,
        bool _listed,
        bool _auction,
        uint _auctionEndTime
    ) private {

        if (price <= 0) revert ErrPriceZero();

        if (msg.value != listingFee) revert ErrListingFee();

        if (_auction && _auctionEndTime <= block.timestamp)
            revert ErrAuctionEndTimeWrong();

        if (_listed && _auction) revert ErrItemListed();

        uint auctionEndTime = _auction ? _auctionEndTime : 0;

        itemsIds.increment();
        uint newItemId = itemsIds.current();
        nfts[newItemId] = DataTypes.MarketItem({
            nftOwner: payable(msg.sender),
            price: price,
            listed: _listed,
            auction: _auction,
            auctionEndTime: auctionEndTime,
            highestBidder: payable(address(0)),
            highestBid: 0,
            itemId: newItemId,
            tokenId: _tokenId
        });

        if (_listed || _auction) {
            _transfer(msg.sender, address(this), _tokenId);
        }

        emit Events.MarketItemCreated(
            newItemId,
            _tokenId,
            payable(msg.sender),
            price
        );
    }

    function resellNftItem(
        uint _itemId,
        uint _price,
        bool _listed,
        bool _auction,
        uint _auctionEndTime
    ) external payable {
        DataTypes.MarketItem storage item = nfts[_itemId];
        if (item.nftOwner != msg.sender) revert ErrInvalidCaller();
        if (item.listed) revert ErrItemListed();
        if (item.auction) revert ErrItemIsAuction();
        if (_listed && _auction) revert ErrItemListed();
        if (msg.value != listingFee) revert ErrListingFee();

        if (_auction && _auctionEndTime <= block.timestamp)
            revert ErrAuctionEndTimeWrong();

        uint auctionEndTime = _auction ? _auctionEndTime : 0;

        soldIds.decrement();
        
         if (_listed || _auction) {
            _transfer(msg.sender, address(this), item.tokenId);
        }

        item.price = _price;
        item.listed = _listed;
        item.auction = _auction;
        item.auctionEndTime = auctionEndTime;
        item.highestBidder = payable(address(0));
        item.highestBid = 0;

        emit Events.ResellNftItem(
            _itemId,
            item.tokenId,
            payable(msg.sender),
            _price
        );
    }

    function buyNftItem(uint _itemId) external payable nonReentrant {
        DataTypes.MarketItem storage item = nfts[_itemId];
        uint itemPrice = item.price;
        uint itemTokenId = item.tokenId;
        address previousNftOwner = item.nftOwner;

        if (msg.value != itemPrice) revert ErrPriceNotEqual();
        if (item.listed == false) revert ErrItemNotListed();
        if (item.auction) revert ErrItemIsAuction();

        item.nftOwner = payable(msg.sender);
        item.listed = false;
        soldIds.increment();

        (address nftCreator, uint royaltyFee) = royaltyInfo(
            itemTokenId,
            itemPrice
        );

        uint buyerAmountReceived = msg.value - royaltyFee;

        (bool success, ) = previousNftOwner.call{value: buyerAmountReceived}(
            ""
        );
        require(success, "tranfer to owner failed");

        // pay royalty fee to creator
        (bool success2, ) = nftCreator.call{value: royaltyFee}("");
        require(success2, "tranfer to creator failed");

        _transfer(address(this), msg.sender, itemTokenId);

        emit Events.MarketItemSold(
            _itemId,
            itemTokenId,
            payable(previousNftOwner),
            payable(msg.sender),
            itemPrice
        );
    }

    function placeBid(uint _itemsId) external payable {
        DataTypes.MarketItem storage item = nfts[_itemsId];

        if (item.auction == false) revert ErrItemIsAuction();
        if (block.timestamp >= item.auctionEndTime) revert ErrAuctionEnded();
        if (msg.value <= item.highestBid) revert ErrInvalidBid();

        // Refund the previous highest bidder
        (bool success, ) = item.highestBidder.call{value: item.highestBid}("");
        require(success, "tranfer to previous highest bidder failed");

        emit Events.PlacedBid(
            _itemsId,
            item.tokenId,
            payable(msg.sender),
            msg.value
        );
    }

    function endAuction(uint _itemsId) external payable {
        DataTypes.MarketItem storage item = nfts[_itemsId];
        if (item.auction == false) revert ErrItemIsAuction();
        if (block.timestamp > item.auctionEndTime)
            revert ErrHasNotAuctionEnded();
        if (msg.sender != item.nftOwner) revert ErrInvalidCaller();

        address itemHighestBidder = item.highestBidder;
        uint itemHighestBid = item.highestBid;
        uint itemTokenId = item.tokenId;
        address previousNftOwner = payable(item.nftOwner);

        item.nftOwner = payable(itemHighestBidder);
        item.auction = false;
        soldIds.increment();

        // transfer the nft to the highest bidder
        _transfer(address(this), itemHighestBidder, itemTokenId);

        // pay royalty fee to creator
        (address nftCreator, uint royaltyFee) = royaltyInfo(
            itemTokenId,
            itemHighestBid
        );

        uint buyerAmountReceived = itemHighestBid - royaltyFee;

        (bool success, ) = nftCreator.call{value: royaltyFee}("");
        require(success, "tranfer to creator failed");

        (bool success2, ) = previousNftOwner.call{value: buyerAmountReceived}(
            ""
        );
        require(success2, "tranfer to owner failed");

        emit Events.AuctionEnded(
            _itemsId,
            itemTokenId,
            payable(item.nftOwner),
            payable(itemHighestBidder),
            itemHighestBid
        );
    }

    // fetch items in market for sale or auction
    function fetchMarketNftItems()
        external
        view
        returns (DataTypes.MarketItem[] memory)
    {
        uint itemCount = itemsIds.current();
        uint unsoldItemCount = itemCount - soldIds.current();
        uint currentIndex = 0;

        DataTypes.MarketItem[] memory items = new DataTypes.MarketItem[](
            unsoldItemCount
        );
        for (uint i = 0; i < itemCount; i++) {
            if (nfts[i + 1].listed == true || nfts[i + 1].auction == true) {
                uint currentId = i + 1;
                DataTypes.MarketItem memory currentItem = nfts[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // fetch users owned nfts
    function fetchMyNfts()
        external
        view
        returns (DataTypes.MarketItem[] memory)
    {
        uint totalNftsItems = itemsIds.current();
        uint userNftItemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalNftsItems; i++) {
            if (nfts[i + 1].nftOwner == msg.sender) {
                userNftItemCount += 1;
            }
        }

        DataTypes.MarketItem[] memory items = new DataTypes.MarketItem[](
            userNftItemCount
        );
        for (uint i = 0; i < userNftItemCount; i++) {
            if (nfts[i + 1].nftOwner == msg.sender) {
                uint currentId = i + 1;
                DataTypes.MarketItem memory currentItem = nfts[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function setRoyaltyFee(uint96 _feeNumerator) external onlyOwner {
        feeNumerator = _feeNumerator;
    }

    function getListingPriceFee() external view returns (uint) {
        return listingFee;
    }

    function updateListingFee(uint _listingFee) external onlyOwner {
        listingFee = _listingFee;
    }

       

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Royalty)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
