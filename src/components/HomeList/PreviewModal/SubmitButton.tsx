import type { Home } from '@/types'

import { getAddressShortcut } from '@/lib'
import { Button } from '@/components/ui/button'
import { Trophy } from 'lucide-react'
import LabelBox from '@/components/LabelBox'
import { useAppContext } from '@/app-context'
import { useEscrowDetails } from '@/hooks'
import useSubmitHandlers from './use-submit-handlers'

const SubmitButton = ({
  homeId,
  price,
}: {
  homeId: Home['id']
  price: number
}) => {
  const { escrowContract, account } = useAppContext()

  const details = useEscrowDetails(escrowContract, homeId)

  const { handleBuy, handleInspect, handleLend, handleSell } =
    useSubmitHandlers({ homeId, details })

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

  const title = hasBought
    ? hasInspected
      ? hasLent
        ? 'Pending Sell...'
        : 'Pending Lending...'
      : 'Pending Inspection...'
    : 'Listed'

  if (isSeller && (!hasInspected || !hasLent || !hasBought)) {
    return <LabelBox className="bg-amber-200">{title}</LabelBox>
  }

  if (hasSold && owner) {
    return (
      <LabelBox title={owner} className="bg-lime-200">
        {isOwner ? (
          <>
            You Own It <Trophy size="18" />
          </>
        ) : isSeller ? (
          `Sold to ${getAddressShortcut(owner)}`
        ) : (
          `Owned by ${getAddressShortcut(owner)}`
        )}
      </LabelBox>
    )
  }

  if (isInspector) {
    return hasBought && !hasInspected ? (
      <Button disabled={hasInspected} onClick={handleInspect}>
        {hasInspected ? 'Inspected' : 'Approve Inspection'}
      </Button>
    ) : (
      <LabelBox className="bg-amber-200">{title}</LabelBox>
    )
  }

  if (isLender) {
    return hasBought && hasInspected && !hasLent ? (
      <Button disabled={hasLent} onClick={handleLend}>
        {hasLent ? 'Lent' : 'Approve & Lend'}
      </Button>
    ) : (
      <LabelBox className="bg-amber-200">{title}</LabelBox>
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
      {hasBought ? title : `Pay ${price} ETH`}
    </Button>
  )
}

export default SubmitButton
