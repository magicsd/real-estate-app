import { Button } from '@/components/ui/button'
import { ethers, AbstractProvider, BrowserProvider } from 'ethers'
import { useEffect, useState } from 'react'
import { Home } from 'lucide-react'
import useMetamask from './use-metamask'

type ProviderState = BrowserProvider | AbstractProvider | null

function App() {
  const [provider, setProvider] = useState<ProviderState>(null)

  const { account, loadAccounts } = useMetamask()

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

  console.log('provider', provider)
  console.log('account', account)

  return (
    <div className="max-w-5xl mx-auto">
      <header className="h-14 flex items-center px-6 gap-6">
        <div className="flex">
          <Home className="text-black" size={32} />
          <Home className="text-purple-700 -translate-x-4" size={32} />
          <Home className="text-black -translate-x-8" size={32} />
        </div>
        <nav className="ml-auto mr-6">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#">Buy</a>
            </li>
            <li>
              <a href="#">Rent</a>
            </li>
            <li>
              <a href="#">Sell</a>
            </li>
          </ul>
        </nav>
        <Button onClick={loadAccounts} disabled={Boolean(account)}>
          {account
            ? `${account.slice(0, 7)}...${account.slice(-5)}`
            : 'Connect Wallet'}
        </Button>
      </header>
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
