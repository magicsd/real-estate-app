import { Button } from '@/components/ui/button'
import { ethers, AbstractProvider, BrowserProvider } from 'ethers'
import { useEffect, useState } from 'react'
import useMetamask from './use-metamask'
import { Header } from './components/Header'

type ProviderState = BrowserProvider | AbstractProvider | null

function App() {
  const [provider, setProvider] = useState<ProviderState>(null)

  const loadBlockchainData = async () => {
    if (!window.ethereum) {
      console.log('Metamask not installed, using default provider.')

      setProvider(ethers.getDefaultProvider())
    } else {
      const provider = new BrowserProvider(window.ethereum)
      setProvider(provider)
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const { account, connect } = useMetamask()

  return (
    <div className="max-w-5xl mx-auto">
      <Header account={account} onWalletButtonClick={connect} />
      <main className="flex flex-col items-center justify-center min-h-screen space-y-20">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          D-Real Estate
        </h1>
        <Button>Hello</Button>
      </main>
    </div>
  )
}

export default App
