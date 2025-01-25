import type { Contract, Home } from '@/types'

import { useCallback, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useAppContext } from '@/app-context'

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

const PreviewModal = ({
  children,
  home,
}: {
  children: React.ReactNode
  home: Home
}) => {
  const [price, ...restAttributes] = home.attributes

  const { escrowContract } = useAppContext()

  const details = useEscrowDetails(escrowContract, home.id)

  console.log('---details', details)

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1">
              <img
                className="rounded-lg object-cover h-full"
                src={home.image}
                alt=""
              />
            </div>
            <div>
              <DialogTitle>{home.name}</DialogTitle>
              <p className="text-sm text-gray-500 mt-3">{home.address}</p>

              <DialogDescription className="mt-6">
                {home.description}
              </DialogDescription>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button>Pay {price.value} ETH</Button>
                <Button variant="secondary">Contact Agent</Button>
              </div>

              <hr className="mt-6" />

              <div className="pt-6">
                <h3 className="text-sm font-medium">Highlights</h3>

                <ul
                  role="list"
                  className="mt-4 text-gray-500 text-sm list-disc pl-5 space-y-1"
                >
                  {restAttributes.map((attr) => (
                    <li className="pl-2" key={attr.trait_type}>
                      <span>{attr.trait_type}</span>: {attr.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewModal
