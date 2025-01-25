import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <div className="flex items-center justify-between gap-8 px-8">
      <div className="py-48 flex-1">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold tracking-tight">D-Real Estate</h1>
          <p className="mt-4 text-xl text-gray-500">
            Find your dream home with us.
          </p>
        </div>
        <div className="mt-10">
          <Button size="lg">Discover</Button>
        </div>
      </div>
      <div className="hidden sm:block flex-1">
        <img
          className="object-cover rounded-lg max-w-full"
          // src="https://static.vecteezy.com/system/resources/previews/023/628/991/original/building-real-estate-house-in-png.png"
          // src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fhouse%2Fhouse_PNG62.png"
          src="https://pngimg.com/uploads/house/house_PNG6.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Hero
