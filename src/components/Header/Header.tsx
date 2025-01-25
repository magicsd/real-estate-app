import { Button } from '@/components/ui/button'
import Logo from './Logo'
import Link from './Link'

const Header = ({
  account,
  onWalletButtonClick,
}: {
  account: string | null
  onWalletButtonClick: () => Promise<void>
}) => {
  return (
    <header className="flex items-center justify-between p-6 gap-6 max-w-5xl mx-auto">
      <nav className="flex-1">
        <ul className="flex items-center gap-12 text-sm font-semibold">
          <li>
            <Link href="#">Buy</Link>
          </li>
          <li>
            <Link href="#">Rent</Link>
          </li>
          <li>
            <Link href="#">Sell</Link>
          </li>
        </ul>
      </nav>

      <a href="/">
        <Logo />
      </a>

      <div className="flex justify-end flex-1">
        <Button onClick={onWalletButtonClick} disabled={Boolean(account)}>
          {account
            ? `${account.slice(0, 7)}...${account.slice(-5)}`
            : 'Connect Wallet'}
        </Button>
      </div>
    </header>
  )
}

export default Header
