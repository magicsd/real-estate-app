import useMetamask from './use-metamask'
import { Header } from '@/components/Header'
import EstateCard from '@/components/EstateCard.tsx'

import useBlockchainData from './use-blockchain-data.ts'

function App() {
  const { homes } = useBlockchainData()

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
          <h3 className="text-2xl mb-6 tracking-tight">Homes for you</h3>
          <ul className="grid grid-cols-3 gap-6">
            {homes.map((home) => {
              const [price, type, beds, baths, sqft, year] = home.attributes

              return (
                <li key={home.id}>
                  <EstateCard
                    description={home.description}
                    title={home.name}
                    imageURL={home.image}
                    purchasePrice={price.value as number}
                    bedCount={beds.value as number}
                    bathCount={baths.value as number}
                    sqft={sqft.value as number}
                    address={home.address}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
