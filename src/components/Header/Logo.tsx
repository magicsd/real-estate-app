import { Home } from 'lucide-react'
import { clsx } from 'clsx'

const commonClasses =
  'text-gray-900 group-hover:text-gray-700 transition-all group-hover:scale-90 delay-75 duration-300 ease-in-out'

const Logo = () => {
  return (
    <div className="flex group relative">
      <Home
        className={clsx(
          commonClasses,
          'translate-x-4 group-hover:translate-x-2',
        )}
        size={32}
      />
      <Home className="text-purple-700" size={32} />
      <Home
        className={clsx(
          commonClasses,
          '-translate-x-4 group-hover:-translate-x-2',
        )}
        size={32}
      />
    </div>
  )
}

export default Logo
