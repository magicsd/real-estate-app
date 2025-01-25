import type { Home } from '@/types'
import { useAppContext } from '@/app-context'
import { useTransactionHandlers } from '@/hooks'
import type { UseEscrowDetailsReturn } from '@/hooks/use-escrow-details.ts'

const useSubmitHandlers = ({
  homeId,
  details,
}: {
  homeId: Home['id']
  details: UseEscrowDetailsReturn
}) => {
  const { escrowContract, provider } = useAppContext()

  const { buy, inspect, lend, sell } = useTransactionHandlers({
    escrowContract,
    homeId,
    provider,
  })

  const handleBuy = async () => {
    await buy()
    details.setHasBought(true)
  }

  const handleInspect = async () => {
    await inspect()
    details.setHasInspected(true)
  }

  const handleLend = async () => {
    await lend()
    details.setHasLent(true)
  }

  const handleSell = async () => {
    await sell()
    details.setHasSold(true)
  }

  return {
    handleBuy,
    handleInspect,
    handleLend,
    handleSell,
  }
}

export default useSubmitHandlers
