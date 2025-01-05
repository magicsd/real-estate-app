import { expect } from 'chai'
import hardhat from 'hardhat'

const { ethers } = hardhat

const tokens = (n) => ethers.utils.parseUnits(n.toString(), 'ether')

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
  let seller, buyer, inspector, lender
  let realEstate, escrow

  it('returns nft address', async () => {
    ;[seller, buyer, inspector, lender] = await ethers.getSigners()

    const RealEstate = await ethers.getContractFactory('RealEstate')
    realEstate = await RealEstate.deploy()

    const transaction = await realEstate.connect(seller).mint(JSON.stringify(uriMock))

    await transaction.wait()

    const Escrow = await ethers.getContractFactory('Escrow')
    escrow = await Escrow.deploy(realEstate.runner.address, seller.address, inspector.address, lender.address)

    const result = await escrow.nftAddress()
    expect(result).to.be.equal(realEstate.runner.address)
  })
})
