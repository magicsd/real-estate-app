import { Header } from '@/components/Header'
import { HomeList } from '@/components/HomeList'

import useBlockchainData from './use-blockchain-data.ts'
import useMetamask from './use-metamask'

function App() {
  const { homes } = useBlockchainData()

  const { account, connect } = useMetamask()

  return (
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
  )
}

export default App
