import EstateMeta from './EstateMeta'

type EstateCardProps = {
  title: string
  imageURL: string
  purchasePrice: number
  bedCount: number
  bathCount: number
  sqft: number
  address: string
  description: string
}

const EstateCard = ({
  title,
  imageURL,
  purchasePrice,
  bedCount,
  bathCount,
  sqft,
  address,
  description,
}: EstateCardProps) => {
  return (
    <div className="rounded border border-gray-200 min-w-48 w-full flex flex-col group text-left">
      <img
        src={imageURL}
        alt=""
        className="w-full h-48 object-cover rounded-t group-hover:opacity-85 transition-opacity"
      />
      <div className="flex flex-col gap-3 p-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="-mt-2 text-xs">{address}</p>

        <p className="text-sm text-gray-500">{description}</p>

        <EstateMeta bedCount={bedCount} bathCount={bathCount} sqft={sqft} />

        <p className="uppercase text-sm font-medium">{purchasePrice} eth</p>
      </div>
    </div>
  )
}

export default EstateCard
