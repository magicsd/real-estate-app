import { type BrowserProvider } from 'ethers'

import { Header } from '@/components/Header'
import Main from '@/components/Main'

import { useBlockchainData, useMetaMask } from './hooks'

function App() {
  const { account, connect } = useMetaMask()

  const { homes, provider, escrowContract } = useBlockchainData()

  return (
    <div className="bg-white">
      <Header account={account} onWalletButtonClick={connect} />
      {provider && escrowContract && (
        <Main
          account={account}
          homes={homes}
          provider={provider as BrowserProvider}
          escrowContract={escrowContract}
        />
      )}
    </div>
  )
}

export default App
