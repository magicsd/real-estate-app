import type { Home } from '@/types'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useAppContext } from '@/app-context'
import useEscrowDetails from '@/hooks/use-escrow-details'

const Content = ({ home }: { home: Home }) => {
  const [price, ...restAttributes] = home.attributes

  const { escrowContract } = useAppContext()

  const details = useEscrowDetails(escrowContract, home.id)

  console.log('---details', details)

  return (
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
  )
}

export default Content
