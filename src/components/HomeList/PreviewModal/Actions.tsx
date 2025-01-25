import type { UseEscrowDetailsReturn } from '@/hooks/use-escrow-details'
import { Trophy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getAddressShortcut } from '@/lib'

const SubmitButton = ({
  details,
  account,
  price,
}: {
  details: UseEscrowDetailsReturn
  account?: string
  price: number
}) => {
  const {
    buyer,
    seller,
    lender,
    inspector,
    hasInspected,
    hasLent,
    hasSold,
    hasBought,
  } = details

  if (!buyer || !seller || !lender || !inspector) return null

  const isBuyer = buyer === account
  const isSeller = seller === account
  const isLender = lender === account
  const isInspector = inspector === account

  if (isBuyer) {
    return (
      <div
        title={getAddressShortcut(buyer)}
        className="h-10 gap-2 px-4 rounded bg-lime-200 flex justify-center font-medium items-center text-sm cursor-default"
      >
        You Own It <Trophy size="18" />
      </div>
    )
  }

  if (isInspector) {
    return <Button disabled={hasInspected}>Approve Inspection</Button>
  }

  if (isLender) {
    return <Button disabled={hasLent}>Approve & Lend</Button>
  }

  if (isSeller) {
    return <Button disabled={hasSold}>Approve & Sell</Button>
  }

  return <Button disabled={hasBought}>Pay {price} ETH</Button>
}

const Actions = ({
  price,
  details,
  account,
}: {
  details: UseEscrowDetailsReturn
  price: number
  account?: string
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SubmitButton account={account} details={details} price={price} />
      <Button variant="secondary">Contact Agent</Button>
    </div>
  )
}

export default Actions
