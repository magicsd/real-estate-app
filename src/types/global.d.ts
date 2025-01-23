import type { Eip1193Provider } from 'ethers'

export {}

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      on: (event: string, handler: any) => Promise<any>
      removeListener: (event: string, handler: any) => Promise<any>
    }
  }
}
