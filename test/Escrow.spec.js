import { expect } from 'chai'
import hre from 'hardhat'

// const tokens = (n) => ethers.utils.parseUnits(n.toString(), 'ether')

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

describe('Escrow', () => {
  let seller, inspector, lender
  let realEstate, escrow

  beforeEach(async () => {
    ;[seller, inspector, lender] = await hre.ethers.getSigners()

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

    transaction = await realEstate.connect(seller).approve(escrowAddress, 1)
    await transaction.wait()

    transaction = await escrow.connect(seller).list(1)
    await transaction.wait
  })

  // Deployment
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

  // Listing
  it('updates ownership', async () => {
    const nftOwner = await realEstate.ownerOf(1)

    expect(nftOwner).to.equal(await escrow.getAddress())
  })

  it('marks nft listed', async () => {
    const value = await escrow.isListed(1)

    expect(value).to.be.true
  })
})
