import { ethers, AbstractProvider, BrowserProvider } from 'ethers'
import { useEffect, useState } from 'react'
import useMetamask from './use-metamask'
import { Header } from '@/components/Header'
import EstateCard from '@/components/EstateCard.tsx'

import RealEstateABI from './abis/RealEstate.json'
import EscrowABI from './abis/Escrow.json'

import config from './config.json'

type Config = Record<
  string,
  Record<'realEstate' | 'escrow', Record<'address', string>>
>

const typedConfig: Config = config

type ProviderState = BrowserProvider | AbstractProvider | null

function App() {
  const [provider, setProvider] = useState<ProviderState>(null)

  const [realEstateContract, setRealEstateContract] =
    useState<ethers.Contract>()

  const [escrowContract, setEscrowContract] = useState<ethers.Contract>()

  const loadBlockchainData = async () => {
    let provider = null

    if (!window.ethereum) {
      console.log('Metamask not installed, using default provider.')

      provider = ethers.getDefaultProvider()
    } else {
      provider = new BrowserProvider(window.ethereum)
    }

    setProvider(provider)

    const network = await provider.getNetwork()

    const contractConfig = typedConfig[network.chainId.toString()]

    setRealEstateContract(
      new ethers.Contract(
        contractConfig.realEstate.address,
        RealEstateABI,
        provider,
      ),
    )

    setEscrowContract(
      new ethers.Contract(contractConfig.escrow.address, EscrowABI, provider),
    )
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const { account, connect } = useMetamask()

  return (
    <div className="min-h-screen">
      <Header account={account} onWalletButtonClick={connect} />
      <main className="flex flex-col items-center justify-center">
        <div
          className="bg-top bg-cover w-full flex items-center justify-center min-h-64"
          style={{
            backgroundImage:
              'url(https://cdn.wallpapersafari.com/88/57/1mqjvO.jpg)',
          }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            D-Real Estate
          </h1>
        </div>
        <div className="p-6 w-full max-w-5xl mx-auto">
          <h3 className="text-2xl mb-6">Homes for you</h3>
          <ul className="grid grid-cols-3 gap-6">
            <li>
              <EstateCard />
            </li>
            <li>
              <EstateCard />
            </li>
            <li>
              <EstateCard />
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
