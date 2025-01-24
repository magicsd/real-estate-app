const EstateCard = () => {
  return (
    <div className="rounded border border-gray-300 min-w-48 flex flex-col">
      <img
        src="https://cdn.houseplansservices.com/product/4ii30750sht8m9orfeoc1idues/w800x533.jpg?v=2"
        alt=""
        className="w-full h-48 object-cover rounded-t"
      />
      <div className="flex flex-col gap-1 p-3">
        <p className="uppercase text-lg font-black">20 eth</p>
        <div className="text-sm">
          <strong>2</strong> beds | <strong>3</strong> baths |{' '}
          <strong>2200</strong> sqft
        </div>
        <p className="text-gray-600 text-sm">
          157 W 57th St APR 49B, New York, NY 10019
        </p>
      </div>
    </div>
  )
}

export default EstateCard
