import type { ProviderState } from './use-blockchain-data'

import { ethers } from 'ethers'
import createContext from '@/lib/create-context'

type AppContext = {
  account?: string
  provider?: ProviderState
  realEstateContract?: ethers.Contract
  escrowContract?: ethers.Contract
}

const [AppContextProvider, useAppContext] = createContext<AppContext>({
  isStrict: true,
  name: 'AppContextProvider',
  hookName: 'useAppContext',
})

export { useAppContext, AppContextProvider }
