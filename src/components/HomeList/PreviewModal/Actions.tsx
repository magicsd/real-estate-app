import type { Home } from '@/types'

import { Button } from '@/components/ui/button'

import SubmitButton from './SubmitButton'

const Actions = ({ price, homeId }: { price: number; homeId: Home['id'] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SubmitButton homeId={homeId} price={price} />
      <Button variant="secondary">Contact Agent</Button>
    </div>
  )
}

export default Actions
