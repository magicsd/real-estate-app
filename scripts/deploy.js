import hre from 'hardhat'

const getEtherTokens = (amount) => {
  return hre.ethers.parseUnits(amount.toString(), 'ether')
}

async function main() {
  const [seller, buyer, lender, inspector] = await hre.ethers.getSigners()

  const realEstate = await hre.ethers.deployContract('RealEstate')

  const realEstateAddress = await realEstate.getAddress()

  console.log(`Deployed Real Estate Contract at: ${realEstateAddress}`)

  for (let i = 1; i <= 3; i++) {
    await realEstate
      .connect(seller)
      .mint(
        `https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i}.json`,
      )
  }

  const escrow = await hre.ethers.deployContract('Escrow', [
    realEstateAddress,
    seller.address,
    inspector.address,
    lender.address,
  ])

  const escrowAddress = await escrow.getAddress()

  console.log(`Deployed Escrow Contract at: ${escrowAddress}`)

  for (let i = 1; i <= 3; i++) {
    await realEstate.connect(seller).approve(escrowAddress, i)
  }

  await escrow
    .connect(seller)
    .list(1, buyer.address, getEtherTokens(20), getEtherTokens(10))

  await escrow
    .connect(seller)
    .list(2, buyer.address, getEtherTokens(15), getEtherTokens(5))

  await escrow
    .connect(seller)
    .list(3, buyer.address, getEtherTokens(10), getEtherTokens(5))

  console.log('Finished')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
