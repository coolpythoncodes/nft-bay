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
    let tokenId1 = 1;
    let tokenId2 = 2;
    let tokenId3 = 3;
    let tokenId4 = 4;
    let listed = false;
    let auction = false;
    let auctionEndTime = 0;

    it("Should create nft token and if not listed or auctioned, nft should not be transferred to the marketplace ", async () => {
      const tx = await nftMarketPlaceContract.connect(addr1).createNftToken(
        tokenURI,
        toWei(price),
        // tokenId1,
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
});
