import type { Home } from '@/types'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Actions from './Actions'

import { useAppContext } from '@/app-context'
import { useEscrowDetails } from '@/hooks'

const Content = ({ home }: { home: Home }) => {
  const [price, ...restAttributes] = home.attributes

  const { escrowContract, account } = useAppContext()

  const details = useEscrowDetails(escrowContract, home.id)

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

          <div className="mt-6">
            <Actions
              account={account}
              details={details}
              price={price.value as number}
            />
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
