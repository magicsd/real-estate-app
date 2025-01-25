import { clsx } from 'clsx'

const LabelBox = ({
  className,
  children,
  title,
}: {
  className?: string
  children: React.ReactNode
  title?: string
}) => (
  <div
    title={title}
    className={clsx(
      'h-10 gap-2 px-4 rounded flex justify-center',
      'font-medium items-center text-sm cursor-default',
      className,
    )}
  >
    {children}
  </div>
)

export default LabelBox
