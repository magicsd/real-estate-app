import { expect } from 'chai'
import hre from 'hardhat'

const getEtherTokens = (amount) => {
  return hre.ethers.parseUnits(amount.toString(), 'ether')
}

const uriMock = {
  name: 'Luxury NYC Penthouse',
  address: '157 W 57th St APT 49B, New York, NY 10019',
  description: 'Luxury Penthouse located in the heart of NYC',
  image:
    'https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png',
  id: '1',
  attributes: [
    {
      trait_type: 'Purchase Price',
      value: 20,
    },
    {
      trait_type: 'Type of Residence',
      value: 'Condo',
    },
    {
      trait_type: 'Bed Rooms',
      value: 2,
    },
    {
      trait_type: 'Bathrooms',
      value: 3,
    },
    {
      trait_type: 'Square Feet',
      value: 2200,
    },
    {
      trait_type: 'Year Built',
      value: 2013,
    },
  ],
}

const nftIdMock = 1
const purchasePriceMock = getEtherTokens(10)
const escrowAmountMock = getEtherTokens(5)

describe('Escrow', () => {
  let seller, inspector, lender, buyer
  let realEstate, escrow

  beforeEach(async () => {
    ;[seller, inspector, lender, buyer] = await hre.ethers.getSigners()

    realEstate = await hre.ethers.deployContract('RealEstate')

    let transaction = await realEstate
      .connect(seller)
      .mint(JSON.stringify(uriMock))

    await transaction.wait()

    const realEstateAddress = await realEstate.getAddress()

    escrow = await hre.ethers.deployContract('Escrow', [
      realEstateAddress,
      seller.address,
      inspector.address,
      lender.address,
    ])

    const escrowAddress = await escrow.getAddress()

    transaction = await realEstate
      .connect(seller)
      .approve(escrowAddress, nftIdMock)
    await transaction.wait()

    transaction = await escrow
      .connect(seller)
      .list(nftIdMock, buyer.address, purchasePriceMock, escrowAmountMock)
    await transaction.wait()
  })

  describe('Deployment', () => {
    it('returns nft address', async () => {
      const result = await escrow.nftAddress()

      expect(result).to.equal(await realEstate.getAddress())
    })

    it('returns seller address', async () => {
      const result = await escrow.seller()

      expect(result).to.equal(seller.address)
    })

    it('returns inspector address', async () => {
      const result = await escrow.inspector()

      expect(result).to.equal(inspector.address)
    })

    it('returns lender address', async () => {
      const result = await escrow.lender()

      expect(result).to.equal(lender)
    })
  })

  describe('Listing', () => {
    it('updates ownership', async () => {
      const nftOwner = await realEstate.ownerOf(nftIdMock)

      expect(nftOwner).to.equal(await escrow.getAddress())
    })

    it('marks nft listed', async () => {
      const value = await escrow.isListed(nftIdMock)

      expect(value).to.be.true
    })

    it('returns buyer', async () => {
      const address = await escrow.buyer(nftIdMock)

      expect(address).to.equal(buyer.address)
    })

    it('returns purchase price', async () => {
      const price = await escrow.purchasePrice(nftIdMock)

      expect(price).to.equal(purchasePriceMock)
    })

    it('returns escrow amount', async () => {
      const value = await escrow.escrowAmount(nftIdMock)

      expect(value).to.equal(escrowAmountMock)
    })

    it('should revert when non-seller tries to list', async () => {
      const transaction = escrow
        .connect(buyer)
        .list(nftIdMock, buyer.address, purchasePriceMock, escrowAmountMock)

      await expect(transaction).to.be.revertedWith(
        'Only seller can call this method',
      )
    })
  })

  describe('Deposits', () => {
    it('should be callable only by buyer', async () => {
      const transaction = escrow
        .connect(seller)
        .depositEarnest(nftIdMock, { value: getEtherTokens(5) })

      await expect(transaction).to.be.revertedWith(
        'Only buyer can call this method',
      )
    })

    it('updates contract balance', async () => {
      const earnest = getEtherTokens(5)

      const transaction = await escrow
        .connect(buyer)
        .depositEarnest(nftIdMock, { value: earnest })

      await transaction.wait()

      const result = await escrow.getBalance()

      expect(result).to.equal(earnest)
    })
  })
})
