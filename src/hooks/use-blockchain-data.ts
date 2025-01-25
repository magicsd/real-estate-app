import { useCallback, useEffect, useState } from 'react'
import { BrowserProvider, ethers } from 'ethers'

import RealEstateABI from '../abis/RealEstate.json'
import EscrowABI from '../abis/Escrow.json'

import configJSON from '../config.json'
import type { Contract, Home, ProviderState } from '@/types.ts'

type Config = Record<
  string,
  Record<'realEstate' | 'escrow', Record<'address', string>>
>

const config: Config = configJSON

const useBlockchainData = () => {
  const [provider, setProvider] = useState<ProviderState>()

  const [realEstateContract, setRealEstateContract] = useState<Contract>()

  const [escrowContract, setEscrowContract] = useState<Contract>()

  const [homes, setHomes] = useState<Home[]>([])

  const handleDataLoad = useCallback(async () => {
    let provider = null

    if (!window.ethereum) {
      console.log('Metamask not installed, using default provider.')

      provider = ethers.getDefaultProvider()
    } else {
      provider = new BrowserProvider(window.ethereum)
    }

    setProvider(provider)

    const network = await provider.getNetwork()

    const contractConfig = config[network.chainId.toString()]

    const realEstateContract = new ethers.Contract(
      contractConfig.realEstate.address,
      RealEstateABI,
      provider,
    )

    setRealEstateContract(realEstateContract)

    setEscrowContract(
      new ethers.Contract(contractConfig.escrow.address, EscrowABI, provider),
    )

    const totalSupply = await realEstateContract.totalSupply()
    const homes = []

    for (let i = 1; i <= totalSupply; i++) {
      const uri = await realEstateContract.tokenURI(i)

      const response = await fetch(uri)
      const home = await response.json()

      homes.push(home)
    }

    setHomes(homes)
  }, [])

  useEffect(() => {
    handleDataLoad()
  }, [handleDataLoad])

  return { provider, realEstateContract, escrowContract, homes }
}

export default useBlockchainData
