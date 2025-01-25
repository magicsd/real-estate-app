import type { Contract, ProviderState } from '@/types'

import { createContext } from '@/lib'

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
