import { Header } from '@/components/Header'
import { HomeList } from '@/components/HomeList'

import useBlockchainData from './use-blockchain-data'
import useMetamask from './use-metamask'
import { AppContextProvider } from './app-context'
import { useMemo } from 'react'

function App() {
  const { homes, provider, escrowContract, realEstateContract } =
    useBlockchainData()

  const { account, connect } = useMetamask()

  const appContextValue = useMemo(
    () => ({
      account,
      provider,
      escrowContract,
      realEstateContract,
    }),
    [account, provider, escrowContract, realEstateContract],
  )

  return (
    <AppContextProvider value={appContextValue}>
      <div className="bg-white">
        <Header account={account} onWalletButtonClick={connect} />
        <main className="flex flex-col items-center justify-center">
          <section className="w-full bg-gray-50">
            <div className="py-32 px-8">
              <h3 className="text-2xl tracking-tight font-bold capitalize">
                Homes for you
              </h3>
              <HomeList homes={homes} className="mt-6" />
            </div>
          </section>
        </main>
      </div>
    </AppContextProvider>
  )
}

export default App
