const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("NFTMarketPlace", () => {
  let deployer;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let nftMarketPlaceContract;
  let blockNumber;
  let block;
  let tokenURI =
    "https://ipfs.io/ipfs/QmZq1X9cJfjJ5g3Zs3r7WQJ7QYVYQ7jL1YQ6pJH7VrZ2X6";
  let listingFee;
  let addressZero = ethers.constants.AddressZero;
  let _auctionEnd;

  beforeEach(async () => {
    [deployer, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    // Deploy NFTMarketPlace contract
    const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
    nftMarketPlaceContract = await NFTMarketPlace.deploy();

    listingFee = await nftMarketPlaceContract.listingFee();
    blockNumber = await ethers.provider.getBlockNumber();
    block = await ethers.provider.getBlock(blockNumber);
    _auctionEnd = block.timestamp + 10800; // Start after 3 hours
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await nftMarketPlaceContract.owner()).to.equal(deployer.address);
    });
  });

  describe("create nft token", () => {
    let price = 2.5;
    let listed = false;
    let auction = false;
    let auctionEndTime = 0;

    it("Should create nft token and if not listed or auctioned, nft should not be transferred to the marketplace ", async () => {
      const tx = await nftMarketPlaceContract
        .connect(addr1)
        .createNftToken(
          tokenURI,
          toWei(price),
          listed,
          auction,
          auctionEndTime,
          {
            value: listingFee,
          }
        );

      const nftToken = await nftMarketPlaceContract.nfts(1);
      expect(+fromWei(nftToken.price)).to.equal(price);
      expect(nftToken.listed).to.equal(listed);
      expect(nftToken.auction).to.equal(auction);
      expect(nftToken.auctionEndTime).to.equal(auctionEndTime);
      expect(nftToken.highestBidder).to.equal(addressZero);
      expect(+fromWei(nftToken.highestBid)).to.equal(0);
      expect(await nftMarketPlaceContract.ownerOf(1)).to.equal(addr1.address);
      expect(nftToken.itemId).to.equal(1);
      expect(nftToken.tokenId).to.equal(1);
      expect(nftToken.nftOwner).to.equal(addr1.address);
      expect(tx)
        .to.emit(nftMarketPlaceContract, "MarketItemCreated")
        .withArgs(1, 1, addr1.address, price);
    });

    it("Should create nft token and if listed, nft should be transferred to the marketplace ", async () => {
      listed = true;

      const tx = await nftMarketPlaceContract.connect(addr1).createNftToken(
        tokenURI,
        toWei(price),
        // tokenId2,
        listed,
        auction,
        auctionEndTime,
        {
          value: listingFee,
        }
      );
      const nftToken = await nftMarketPlaceContract.nfts(1);
      expect(+fromWei(nftToken.price)).to.equal(price);
      expect(nftToken.listed).to.equal(listed);
      expect(nftToken.auction).to.equal(auction);
      expect(nftToken.auctionEndTime).to.equal(auctionEndTime);
      expect(nftToken.highestBidder).to.equal(addressZero);
      expect(+fromWei(nftToken.highestBid)).to.equal(0);
      expect(await nftMarketPlaceContract.ownerOf(1)).to.equal(
        nftMarketPlaceContract.address
      );
      expect(nftToken.itemId).to.equal(1);
      expect(nftToken.tokenId).to.equal(1);
      expect(nftToken.nftOwner).to.equal(addr1.address);
      expect(tx)
        .to.emit(nftMarketPlaceContract, "MarketItemCreated")
        .withArgs(1, 1, addr1.address, price);
    });

    it("Should create nft token and if auctioned, nft should be transferred to the marketplace ", async () => {
      auction = true;
      listed = false;
      auctionEndTime = _auctionEnd;

      const tx = await nftMarketPlaceContract
        .connect(addr1)
        .createNftToken(
          tokenURI,
          toWei(price),
          listed,
          auction,
          auctionEndTime,
          {
            value: listingFee,
          }
        );

      const nftToken = await nftMarketPlaceContract.nfts(1);
      expect(+fromWei(nftToken.price)).to.equal(price);
      expect(nftToken.listed).to.equal(listed);
      expect(nftToken.auction).to.equal(auction);
      expect(nftToken.auctionEndTime).to.equal(auctionEndTime);
      expect(nftToken.highestBidder).to.equal(addressZero);
      expect(+fromWei(nftToken.highestBid)).to.equal(0);
      expect(await nftMarketPlaceContract.ownerOf(1)).to.equal(
        nftMarketPlaceContract.address
      );
      expect(nftToken.itemId).to.equal(1);
      expect(nftToken.tokenId).to.equal(1);
      expect(nftToken.nftOwner).to.equal(addr1.address);
      expect(tx)
        .to.emit(nftMarketPlaceContract, "MarketItemCreated")
        .withArgs(1, 1, addr1.address, price);
    });

    it("Should revert if price is zero", async () => {
      price = 0;
      expect(
        nftMarketPlaceContract
          .connect(addr1)
          .createNftToken(
            tokenURI,
            toWei(price),
            listed,
            auction,
            auctionEndTime,
            {
              value: listingFee,
            }
          )
      ).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrPriceZero");
    });

    it("Should revert if msg.value is less than listing fee", async () => {
      price = 2.5;
      expect(
        nftMarketPlaceContract
          .connect(addr1)
          .createNftToken(
            tokenURI,
            toWei(price),
            listed,
            auction,
            auctionEndTime,
            {
              value: toWei(0.000001),
            }
          )
      ).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrListingFee");
    });

    it("Should revert if auction end time is less than current time", async () => {
      price = 2.5;
      auction = true;
      auctionEndTime = block.timestamp - 10800;
      expect(
        nftMarketPlaceContract
          .connect(addr1)
          .createNftToken(
            tokenURI,
            toWei(price),
            listed,
            auction,
            auctionEndTime,
            {
              value: listingFee,
            }
          )
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrAuctionEndTimeWrong"
      );
    });

    it("Should revert if item is listed and auctioned", async () => {
      listed = true;
      auctionEndTime = block.timestamp + 10800;
      expect(
        nftMarketPlaceContract
          .connect(addr1)
          .createNftToken(
            tokenURI,
            toWei(price),
            listed,
            auction,
            auctionEndTime,
            {
              value: listingFee,
            }
          )
      ).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrItemListed");
    });
  });

  describe("Buy NFT item", () => {
    let creator;
    let buyer;

    const ListedNFTItem = {
      tokenURI,
      price: 2.5,
      listed: true,
      auction: false,
      auctionEndTime: 0,
    };

    const NotListedNFTItem = {
      tokenURI,
      price: 2.5,
      listed: false,
      auction: false,
      auctionEndTime: 0,
    };

    const AuctionedNFTItem = {
      tokenURI,
      price: 2.5,
      listed: false,
      auction: true,
      auctionEndTime: Math.floor(Date.now() / 1000) + 10800,
    };

    beforeEach(async () => {
      [creator, buyer] = await ethers.getSigners();

      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          ListedNFTItem.tokenURI,
          toWei(ListedNFTItem.price),
          ListedNFTItem.listed,
          ListedNFTItem.auction,
          ListedNFTItem.auctionEndTime,
          {
            value: listingFee,
          }
        );

      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          NotListedNFTItem.tokenURI,
          toWei(NotListedNFTItem.price),
          NotListedNFTItem.listed,
          NotListedNFTItem.auction,
          NotListedNFTItem.auctionEndTime,
          {
            value: listingFee,
          }
        );

      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          AuctionedNFTItem.tokenURI,
          toWei(AuctionedNFTItem.price),
          AuctionedNFTItem.listed,
          AuctionedNFTItem.auction,
          AuctionedNFTItem.auctionEndTime,
          {
            value: listingFee,
          }
        );

      creatorBalanceBefore = await ethers.provider.getBalance(creator.address);
      // console.log("creatorBalanceBefore", fromWei(creatorBalanceBefore));
    });

    it("Should buy listed nft item with the correct price", async () => {
      let nftToken = await nftMarketPlaceContract.nfts(1);
      nftOwner = nftToken.nftOwner;

      const tx = await nftMarketPlaceContract.connect(addr2).buyNftItem(1, {
        from: addr2.address,
        value: nftToken.price,
      });

      nftToken = await nftMarketPlaceContract.nfts(1);

      // Verify that the item's ownership has been transferred to the buyer.
      expect(await nftMarketPlaceContract.ownerOf(1)).to.equal(addr2.address);

      // Verify that the item is no longer listed.
      expect(nftToken.listed).to.equal(false);

      // Verify that the item is not auctioned.
      expect(nftToken.auction).to.equal(false);

      // Verify the correct amount of ether has been transferred to the previous owner
      // const previousOwnerBalance = await ethers.provider.getBalance(nftOwner);
      // console.log("previousOwnerBalance", fromWei(previousOwnerBalance));
      // expect(await addr1.getBalance()).to.equal()
    });

    it("should revert if msg value is not equal to nft item price", async () => {
      expect(
        nftMarketPlaceContract.connect(addr2).buyNftItem(1, {
          from: addr2.address,
          value: toWei(ListedNFTItem.price - 0.001),
        })
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrPriceNotEqual"
      );
    });

    it("should revert if nft item is not listed", async () => {
      nftToken = await nftMarketPlaceContract.nfts(2);
      expect(
        nftMarketPlaceContract.connect(addr2).buyNftItem(2, {
          from: addr2.address,
          value: nftToken.price,
        })
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrItemNotListed"
      );
    });

    it("should revert if nft item is auctioned", async () => {
      nftToken = await nftMarketPlaceContract.nfts(3);
      expect(
        nftMarketPlaceContract.connect(addr2).buyNftItem(3, {
          from: addr2.address,
          value: nftToken.price,
        })
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrItemIsAuction"
      );
    });
  });

  describe("resell NFT item", () => {
    let creator;
    let buyer;
    let nftMarketItem;

    const nftItem = {
      tokenURI,
      price: 2.5,
      listed: true,
      auction: false,
      auctionEndTime: 0,
    };

    const nftItem2 = {
      tokenURI,
      price: 1.5,
      listed: true,
      auction: false,
      auctionEndTime: 0,
    };

    const nftItem3 = {
      tokenURI,
      price: 4.5,
      listed: true,
      auction: false,
      auctionEndTime: 0,
    };

    const resellItemListedDetails = {
      item: 1,
      price: 3.5,
      listed: true,
      auction: false,
      auctionEndTime: 0,
    };

    const resellItemAuctionDetails = {
      item: 2,
      price: 3.5,
      listed: false,
      auction: true,
      auctionEndTime: Math.floor(Date.now() / 1000) + 10800,
    };

    const resellItemNotListedDetails = {
      item: 3,
      price: 3.5,
      listed: false,
      auction: false,
      auctionEndTime: 0,
    };

    beforeEach(async () => {
      [creator, buyer] = await ethers.getSigners();

      // Create NFT item

      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          nftItem.tokenURI,
          toWei(nftItem.price),
          nftItem.listed,
          nftItem.auction,
          nftItem.auctionEndTime,
          {
            value: listingFee,
          }
        );

      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          nftItem2.tokenURI,
          toWei(nftItem2.price),
          nftItem2.listed,
          nftItem2.auction,
          nftItem2.auctionEndTime,
          {
            value: listingFee,
          }
        );

      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          nftItem3.tokenURI,
          toWei(nftItem3.price),
          nftItem3.listed,
          nftItem3.auction,
          nftItem3.auctionEndTime,
          {
            value: listingFee,
          }
        );

      // this nft item will be listed and the owner will try to resell it
      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          resellItemListedDetails.item,
          toWei(resellItemListedDetails.price),
          resellItemListedDetails.listed,
          resellItemListedDetails.auction,
          resellItemListedDetails.auctionEndTime,
          {
            value: listingFee,
          }
        );

      // this nft item will be auctioned and the owner will try to resell it
      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          resellItemAuctionDetails.item,
          toWei(resellItemAuctionDetails.price),
          resellItemAuctionDetails.listed,
          resellItemAuctionDetails.auction,
          resellItemAuctionDetails.auctionEndTime,
          {
            value: listingFee,
          }
        );

      const createdNftItem = await nftMarketPlaceContract.nfts(1); // get listed nft item
      const createdNftItem2 = await nftMarketPlaceContract.nfts(2); // get auctioned nft item
      const createdNftItem3 = await nftMarketPlaceContract.nfts(3); // get not listed nft item
      // Buy NFT item

      // buy listed nft item
      await nftMarketPlaceContract.connect(buyer).buyNftItem(1, {
        from: buyer.address,
        value: createdNftItem.price,
      });

      // buy auctioned nft item
      await nftMarketPlaceContract.connect(buyer).buyNftItem(2, {
        from: buyer.address,
        value: createdNftItem2.price,
      });

      // buy not listed nft item
      await nftMarketPlaceContract.connect(buyer).buyNftItem(3, {
        from: buyer.address,
        value: createdNftItem3.price,
      });
    });

    it("should resell nft item with correct parameters", async () => {
      // transaction to resell nft item with listing option
      const tx = await nftMarketPlaceContract
        .connect(buyer)
        .resellNftItem(
          resellItemListedDetails.item,
          toWei(resellItemListedDetails.price),
          resellItemListedDetails.listed,
          resellItemListedDetails.auction,
          resellItemListedDetails.auctionEndTime,
          {
            from: buyer.address,
            value: listingFee,
          }
        );

      // transaction to resell nft item with auction option
      const txAuction = await nftMarketPlaceContract
        .connect(buyer)
        .resellNftItem(
          resellItemAuctionDetails.item,
          toWei(resellItemAuctionDetails.price),
          resellItemAuctionDetails.listed,
          resellItemAuctionDetails.auction,
          resellItemAuctionDetails.auctionEndTime,
          {
            from: buyer.address,
            value: listingFee,
          }
        );

      const txNotListedNotAuctioned = await nftMarketPlaceContract
        .connect(buyer)
        .resellNftItem(
          resellItemNotListedDetails.item,
          toWei(resellItemNotListedDetails.price),
          resellItemNotListedDetails.listed,
          resellItemNotListedDetails.auction,
          resellItemNotListedDetails.auctionEndTime,
          {
            from: buyer.address,
            value: listingFee,
          }
        );

      // Verify that the item is listed.
      nftMarketItem = await nftMarketPlaceContract.nfts(1);
      expect(nftMarketItem.price).to.equal(
        toWei(resellItemListedDetails.price)
      );
      expect(nftMarketItem.listed).to.equal(resellItemListedDetails.listed);
      expect(nftMarketItem.auction).to.equal(resellItemListedDetails.auction);
      expect(nftMarketItem.auctionEndTime).to.equal(
        resellItemListedDetails.auctionEndTime
      );
      expect(nftMarketItem.highestBidder).to.equal(addressZero);
      expect(+fromWei(nftMarketItem.highestBid)).to.equal(0);

      // Verify that the item's ownership has been transferred to the market place.
      expect(await nftMarketPlaceContract.ownerOf(1)).to.equal(
        nftMarketPlaceContract.address
      );

      // Verify that the item is auctioned.
      nftMarketItem = await nftMarketPlaceContract.nfts(2);
      expect(nftMarketItem.price).to.equal(
        toWei(resellItemAuctionDetails.price)
      );
      expect(nftMarketItem.listed).to.equal(resellItemAuctionDetails.listed);
      expect(nftMarketItem.auction).to.equal(resellItemAuctionDetails.auction);
      expect(nftMarketItem.auctionEndTime).to.equal(
        resellItemAuctionDetails.auctionEndTime
      );
      expect(nftMarketItem.highestBidder).to.equal(addressZero);
      expect(+fromWei(nftMarketItem.highestBid)).to.equal(0);

      // Verify that the item's ownership has been transferred to the market place.
      expect(await nftMarketPlaceContract.ownerOf(2)).to.equal(
        nftMarketPlaceContract.address
      );

      // Verify that the item is not listed.
      nftMarketItem = await nftMarketPlaceContract.nfts(3);

      expect(nftMarketItem.price).to.equal(
        toWei(resellItemNotListedDetails.price)
      );
      expect(nftMarketItem.listed).to.equal(resellItemNotListedDetails.listed);
      expect(nftMarketItem.auction).to.equal(
        resellItemNotListedDetails.auction
      );
      expect(nftMarketItem.auctionEndTime).to.equal(
        resellItemNotListedDetails.auctionEndTime
      );
      expect(nftMarketItem.highestBidder).to.equal(addressZero);
      expect(+fromWei(nftMarketItem.highestBid)).to.equal(0);

      // Verify that the item's ownership has not been transferred to the market place.
      expect(await nftMarketPlaceContract.ownerOf(3)).to.equal(buyer.address);
    });

    it("should revert if caller is not the owner of the item", async () => {
      expect(
        nftMarketPlaceContract
          .connect(creator)
          .resellNftItem(
            resellItemListedDetails.item,
            toWei(resellItemListedDetails.price),
            resellItemListedDetails.listed,
            resellItemListedDetails.auction,
            resellItemListedDetails.auctionEndTime,
            {
              from: creator.address,
              value: listingFee,
            }
          )
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrInvalidCaller"
      );
    });

    it("should revert if item to resell is listed alreadly", async () => {
      const createdNftItem4 = await nftMarketPlaceContract.nfts(4);
      expect(
        nftMarketPlaceContract
          .connect(creator)
          .resellNftItem(
            4,
            createdNftItem4.price,
            createdNftItem4.listed,
            createdNftItem4.auction,
            createdNftItem4.auctionEndTime,
            {
              from: creator.address,
              value: listingFee,
            }
          )
      ).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrItemListed");
    });

    it("should revert if item to resell is auctioned alreadly", async () => {
      const createdNftItem5 = await nftMarketPlaceContract.nfts(5);
      expect(
        nftMarketPlaceContract
          .connect(creator)
          .resellNftItem(
            5,
            createdNftItem5.price,
            createdNftItem5.listed,
            createdNftItem5.auction,
            createdNftItem5.auctionEndTime,
            {
              from: creator.address,
              value: toWei(0.00001),
            }
          )
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrItemIsAuction"
      );
    });

    it("should revert if msg.value is not equal to listingFee", async () => {
      expect(
        nftMarketPlaceContract
          .connect(buyer)
          .resellNftItem(
            resellItemListedDetails.item,
            toWei(resellItemListedDetails.price),
            resellItemListedDetails.listed,
            resellItemListedDetails.auction,
            resellItemListedDetails.auctionEndTime,
            {
              from: buyer.address,
              value: toWei(0.00001),
            }
          )
      ).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrListingFee");
    });

    it("should revert if auction end time is less than current block timestamp", async () => {
      const auctionEndTime = block.timestamp - 10800;
      expect(
        nftMarketPlaceContract
          .connect(buyer)
          .resellNftItem(
            resellItemAuctionDetails.item,
            toWei(resellItemAuctionDetails.price),
            resellItemAuctionDetails.listed,
            resellItemAuctionDetails.auction,
            auctionEndTime,
            {
              from: buyer.address,
              value: listingFee,
            }
          )
      ).to.be.revertedWithCustomError(
        nftMarketPlaceContract,
        "ErrAuctionEndTimeWrong"
      );
    });
  });

  describe("place bid on auction items", () => {
    let creator;
    let buyer;
    let buyer2;
    let nftMarketItem;

    const auctionItemDetails = {
      tokenURI,
      price: 2.5,
      listed: false,
      auction: true,
      auctionEndTime: Math.floor(Date.now() / 1000) + 10800,
    };

    const listedItemDetails = {
      tokenURI,
      price: 2.5,
      listed: true,
      auction: false,
      auctionEndTime: 0,
    };

    beforeEach(async () => {
      [creator, buyer, buyer2] = await ethers.getSigners();

      // Create NFT item and auction
      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          auctionItemDetails.tokenURI,
          toWei(auctionItemDetails.price),
          auctionItemDetails.listed,
          auctionItemDetails.auction,
          auctionItemDetails.auctionEndTime,
          {
            value: listingFee,
          }
        );

      // Create NFT item and list it
      await nftMarketPlaceContract
        .connect(creator)
        .createNftToken(
          listedItemDetails.tokenURI,
          toWei(listedItemDetails.price),
          listedItemDetails.listed,
          listedItemDetails.auction,
          listedItemDetails.auctionEndTime,
          {
            value: listingFee,
          }
        );
    });

    it("should place bid on auction item", async () => {
      // Place bid on auction item
      const tx = await nftMarketPlaceContract
        .connect(buyer)
        .placeBid(1, {
          from: buyer.address,
          value: toWei(3),
        });

      // Verify that the item's highest bid has been updated.
      nftMarketItem = await nftMarketPlaceContract.nfts(1);
      expect(nftMarketItem.highestBidder).to.equal(buyer.address);
      expect(+fromWei(nftMarketItem.highestBid)).to.equal(3);
    })

    it('should revert if nft item is not auctioned', async () => {
      expect(nftMarketPlaceContract
        .connect(buyer)
        .placeBid(2, {
          from: buyer.address,
          value: toWei(3),
        })).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrItemIsAuction");
    })

        it('should revert if the bid is less than the highest bid', async () => {
      await nftMarketPlaceContract
        .connect(buyer)
        .placeBid(1, {
          from: buyer.address,
          value: toWei(3),
        });

      expect(nftMarketPlaceContract
        .connect(buyer2)
        .placeBid(1, {
          from: buyer2.address,
          value: toWei(2),
        })).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrInvalidBid");
    })

    it('should revert if the auction has ended', async () => {
      await ethers.provider.send("evm_increaseTime", [172800]);
      await ethers.provider.send("evm_mine");

      expect(nftMarketPlaceContract
        .connect(buyer)
        .placeBid(1, {
          from: buyer.address,
          value: toWei(3),
        })).to.be.revertedWithCustomError(nftMarketPlaceContract, "ErrAuctionEnded");

    });

  });

  // describe('end auction', () => {
    
  // });
  
});
