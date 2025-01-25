import type { Home } from '@/types'

import PreviewModal from './PreviewModal'
import EstateCard from './EstateCard'
import { clsx } from 'clsx'

const HomeList = ({
  className,
  homes,
}: {
  className?: string
  homes: Home[]
}) => {
  return (
    <ul
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
        className,
      )}
    >
      {homes.map((home) => (
        <li key={home.id}>
          <PreviewModal home={home}>
            <EstateCard home={home} />
          </PreviewModal>
        </li>
      ))}
    </ul>
  )
}

export default HomeList
