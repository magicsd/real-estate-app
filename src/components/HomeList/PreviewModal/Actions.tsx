import type { Home } from '@/types'

import { Trophy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getAddressShortcut } from '@/lib'

import { useAppContext } from '@/app-context'
import { useEscrowDetails, useTransactionHandlers } from '@/hooks'

const SubmitButton = ({
  homeId,
  price,
}: {
  homeId: Home['id']
  price: number
}) => {
  const { escrowContract, account, provider } = useAppContext()

  const details = useEscrowDetails(escrowContract, homeId)

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

  const {
    buyer,
    seller,
    lender,
    inspector,
    hasInspected,
    hasLent,
    hasSold,
    hasBought,
    owner,
  } = details

  if (!buyer || !seller || !lender || !inspector) return null

  const isSeller = seller === account
  const isLender = lender === account
  const isInspector = inspector === account
  const isOwner = owner === account

  if (hasSold && owner) {
    return (
      <div
        title={owner}
        className="h-10 gap-2 px-4 rounded bg-lime-200 flex justify-center font-medium items-center text-sm cursor-default"
      >
        {isOwner ? (
          <>
            You Own It <Trophy size="18" />
          </>
        ) : (
          `Owned by ${getAddressShortcut(owner)}`
        )}
      </div>
    )
  }

  if (isInspector) {
    return (
      <Button disabled={hasInspected} onClick={handleInspect}>
        {hasInspected ? 'Inspected' : 'Approve Inspection'}
      </Button>
    )
  }

  if (isLender) {
    return (
      <Button disabled={hasLent} onClick={handleLend}>
        {hasLent ? 'Lent' : 'Approve & Lend'}
      </Button>
    )
  }

  if (isSeller) {
    return (
      <Button disabled={hasSold} onClick={handleSell}>
        {hasSold ? 'Sold' : 'Approve & Sell'}
      </Button>
    )
  }

  return (
    <Button onClick={handleBuy} disabled={hasBought}>
      {hasBought ? 'In approval...' : `Pay ${price} ETH`}
    </Button>
  )
}

const Actions = ({ price, homeId }: { price: number; homeId: Home['id'] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SubmitButton homeId={homeId} price={price} />
      <Button variant="secondary">Contact Agent</Button>
    </div>
  )
}

export default Actions
