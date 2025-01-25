import { HomeList } from '@/components/HomeList'
import { AppContextProvider } from '@/app-context'
import { useMemo } from 'react'
import type { Contract, Home } from '@/types'
import { BrowserProvider } from 'ethers'

const Main = ({
  homes,
  account,
  provider,
  escrowContract,
}: {
  homes: Home[]
  account?: string
  provider: BrowserProvider
  escrowContract: Contract
}) => {
  const appContextValue = useMemo(
    () => ({
      account,
      provider,
      escrowContract,
    }),
    [account, provider, escrowContract],
  )

  return (
    <AppContextProvider value={appContextValue}>
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
    </AppContextProvider>
  )
}

export default Main
