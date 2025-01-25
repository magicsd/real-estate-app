import type { Home } from '@/types'

import EstateMeta from './EstateMeta'

const EstateCard = ({ home }: { home: Home }) => {
  const [price, , beds, baths, sqft] = home.attributes

  return (
    <div className="bg-white rounded-lg border border-gray-200 min-w-48 w-full flex flex-col group text-left">
      <img
        src={home.image}
        alt=""
        className="w-full h-48 object-cover rounded-t group-hover:opacity-85 transition-opacity"
      />
      <div className="flex flex-col gap-3 p-3">
        <p className="text-sm font-semibold">{home.name}</p>

        <p className="-mt-2 text-xs">{home.address}</p>

        <p className="text-sm text-gray-500">{home.description}</p>

        <EstateMeta
          bedCount={beds.value as number}
          bathCount={baths.value as number}
          sqft={sqft.value as number}
        />

        <p className="uppercase text-sm font-medium">{price.value} eth</p>
      </div>
    </div>
  )
}

export default EstateCard
