import type { Contract, Home } from '@/types'

import { useCallback, useEffect, useState } from 'react'

const useEscrowDetails = (escrowContract?: Contract, homeId?: Home['id']) => {
  const [buyer, setBuyer] = useState<string>()
  const [seller, setSeller] = useState<string>()
  const [lender, setLender] = useState<string>()
  const [inspector, setInspector] = useState<string>()

  const [owner, setOwner] = useState<string>()

  const [hasBought, setHasBought] = useState(false)
  const [hasSold, setHasSold] = useState(false)
  const [hasLent, setHasLent] = useState(false)
  const [hasInspected, setHasInspected] = useState(false)

  const fetchDetails = useCallback(async () => {
    if (!escrowContract || !homeId) return

    const buyer = await escrowContract.buyer(homeId)
    setBuyer(buyer)

    const hasBought = await escrowContract.approval(homeId, buyer)
    setHasBought(hasBought)

    const seller = await escrowContract.seller()
    setSeller(seller)

    const hasSold = await escrowContract.approval(homeId, seller)
    setHasSold(hasSold)

    const lender = await escrowContract.lender()
    setLender(lender)

    const hasLent = await escrowContract.approval(homeId, lender)
    setHasLent(hasLent)

    const inspector = await escrowContract.inspector()
    setInspector(inspector)

    const hasInspected = await escrowContract.inspectionPassed(homeId)
    setHasInspected(hasInspected)
  }, [escrowContract, homeId])

  const fetchOwner = useCallback(async () => {
    if (!escrowContract || !homeId) return

    const isListed = await escrowContract.isListed(homeId)

    if (!isListed) return

    const owner = await escrowContract.buyer(homeId)

    setOwner(owner)
  }, [escrowContract, homeId])

  useEffect(() => {
    fetchDetails()
    fetchOwner()
  }, [fetchDetails, fetchOwner])

  return {
    buyer,
    seller,
    lender,
    owner,
    inspector,
    hasBought,
    hasSold,
    hasLent,
    hasInspected,
  }
}

export default useEscrowDetails
