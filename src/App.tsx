import { Button } from '@/components/ui/button'
import {
  ethers,
  AbstractProvider,
  BrowserProvider,
  JsonRpcSigner,
} from 'ethers'
import { useEffect, useState } from 'react'

type ProviderState = BrowserProvider | AbstractProvider | null

function App() {
  const [provider, setProvider] = useState<ProviderState>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>()

  const loadBlockchainData = async () => {
    if (!window.ethereum) {
      console.log('Metamask not installed, using default provider.')

      setProvider(ethers.getDefaultProvider())
    } else {
      const provider = new BrowserProvider(window.ethereum)
      setProvider(provider)

      const signer = await provider.getSigner()

      setSigner(signer)
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  console.log('provider', provider)
  console.log('signer', signer)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-20">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        D-Real Estate
      </h1>
      <Button>Hello</Button>
    </main>
  )
}

export default App
