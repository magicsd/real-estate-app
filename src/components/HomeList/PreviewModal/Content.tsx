import type { Home } from '@/types'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Actions from './Actions'

const Content = ({ home }: { home: Home }) => {
  const [price] = home.attributes

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
            <Actions homeId={home.id} price={price.value as number} />
          </div>

          <hr className="mt-6" />

          <div className="pt-6">
            <h3 className="text-sm font-medium">Highlights</h3>

            <ul
              role="list"
              className="mt-4 text-gray-500 text-sm list-disc pl-5 space-y-1"
            >
              {home.attributes.map((attr) => (
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
