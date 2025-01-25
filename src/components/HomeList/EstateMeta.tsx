const EstateMeta = ({
  bedCount,
  bathCount,
  sqft,
}: {
  bedCount: number
  bathCount: number
  sqft: number
}) => (
  <div className="text-sm">
    <strong>{bedCount}</strong> beds | <strong>{bathCount}</strong> baths |{' '}
    <strong>{sqft}</strong> sqft
  </div>
)

export default EstateMeta
