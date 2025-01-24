import { useCallback, useEffect, useState } from 'react'

const useMetamask = () => {
  const [account, setAccount] = useState<string | null>(null)

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.')
    } else {
      setAccount(accounts[0])
    }
  }

  const connect = useCallback(async () => {
    const accounts = await window.ethereum?.request({ method: 'eth_accounts' })

    handleAccountsChanged(accounts)
  }, [])

  useEffect(() => {
    if (!window.ethereum) {
      console.log('MetaMask is not detected.')

      return
    }

    connect()

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [connect])

  return { account, connect }
}

export default useMetamask
