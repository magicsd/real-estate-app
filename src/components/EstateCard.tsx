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
    <button
      className="rounded border border-gray-200 min-w-48 w-full flex flex-col group text-left"
      type="button"
    >
      <img
        src={imageURL}
        alt=""
        className="w-full h-48 object-cover rounded-t group-hover:opacity-85 transition-opacity"
      />
      <div className="flex flex-col gap-3 p-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="-mt-2 italic text-xs">{address}</p>

        <p className="text-sm text-gray-500">{description}</p>
        <div className="text-sm">
          <strong>{bedCount}</strong> beds | <strong>{bathCount}</strong> baths
          | <strong>{sqft}</strong> sqft
        </div>
        <p className="uppercase text-sm font-medium text-purple-800">
          {purchasePrice} eth
        </p>
      </div>
    </button>
  )
}

export default EstateCard
