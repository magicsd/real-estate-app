import type { Home } from '@/types'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import Content from './Content'

const PreviewModal = ({
  children,
  home,
}: {
  children: React.ReactNode
  home: Home
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <Content home={home} />
      </DialogContent>
    </Dialog>
  )
}

export default PreviewModal
