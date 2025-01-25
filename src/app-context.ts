import type { Contract } from '@/types'
import { type BrowserProvider } from 'ethers'

import { createContext } from '@/lib'

type AppContext = {
  account?: string
  provider: BrowserProvider
  escrowContract: Contract
}

const [AppContextProvider, useAppContext] = createContext<AppContext>({
  isStrict: true,
  name: 'AppContextProvider',
  hookName: 'useAppContext',
})

export { useAppContext, AppContextProvider }
