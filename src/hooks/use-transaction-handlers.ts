import type { Contract, Home } from '@/types'

import { useCallback } from 'react'
import { BrowserProvider } from 'ethers'

const useTransactionHandlers = ({
  escrowContract,
  homeId,
  provider,
}: {
  escrowContract: Contract
  provider: BrowserProvider
  homeId: Home['id']
}) => {
  const buy = useCallback(async () => {
    const escrowAmount = await escrowContract.escrowAmount(homeId)

    const signer = await provider.getSigner()

    const signedEscrow = escrowContract.connect(signer) as Contract
    await signedEscrow.depositEarnest(homeId, { value: escrowAmount })

    await signedEscrow.approveSale(homeId)
  }, [escrowContract, homeId, provider])

  const inspect = useCallback(async () => {
    const signer = await provider.getSigner()

    const signedEscrow = escrowContract.connect(signer) as Contract
    await signedEscrow.updateInspectionStatus(homeId, true)
  }, [escrowContract, homeId, provider])

  const lend = useCallback(async () => {
    const signer = await provider.getSigner()

    const signedEscrow = escrowContract.connect(signer) as Contract
    await signedEscrow.approveSale(homeId)

    const escrowAmount = await escrowContract.escrowAmount(homeId)
    const purchasePrice = await escrowContract.purchasePrice(homeId)
    const lendAmount = purchasePrice - escrowAmount

    await signer.sendTransaction({
      to: escrowContract.getAddress(),
      value: lendAmount.toString(),
      gasLimit: 60000,
    })
  }, [escrowContract, homeId, provider])

  const sell = useCallback(async () => {
    const signer = await provider.getSigner()

    const signedEscrow = escrowContract.connect(signer) as Contract
    await signedEscrow.approveSale(homeId)

    await signedEscrow.finalizeSell(homeId)
  }, [escrowContract, homeId, provider])

  return {
    buy,
    inspect,
    lend,
    sell,
  }
}

export default useTransactionHandlers
