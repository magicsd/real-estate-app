const Link = ({
  children,
  ...rest
}: {
  children: React.ReactNode
  href: string
}) => {
  return (
    <a
      className="hover:border-purple-800 text-gray-700 hover:text-gray-900 border-b-2 border-transparent flex py-1 transition-colors"
      {...rest}
    >
      {children}
    </a>
  )
}

export default Link
