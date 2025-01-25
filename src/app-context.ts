import type { ProviderState } from './use-blockchain-data'
import type { Contract } from '@/types'

import createContext from '@/lib/create-context'

type AppContext = {
  account?: string
  provider?: ProviderState
  realEstateContract?: Contract
  escrowContract?: Contract
}

const [AppContextProvider, useAppContext] = createContext<AppContext>({
  isStrict: true,
  name: 'AppContextProvider',
  hookName: 'useAppContext',
})

export { useAppContext, AppContextProvider }
