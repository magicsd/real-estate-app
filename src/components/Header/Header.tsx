import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = ({
  account,
  onWalletButtonClick,
}: {
  account: string | null
  onWalletButtonClick: () => Promise<void>
}) => {
  return (
    <header className="h-14 flex items-center px-6 gap-6 max-w-5xl mx-auto">
      <div className="flex">
        <Home className="text-black" size={32} />
        <Home className="text-purple-700 -translate-x-4" size={32} />
        <Home className="text-black -translate-x-8" size={32} />
      </div>
      <nav className="ml-auto mr-6">
        <ul className="flex items-center gap-6">
          <li>
            <a href="#">Buy</a>
          </li>
          <li>
            <a href="#">Rent</a>
          </li>
          <li>
            <a href="#">Sell</a>
          </li>
        </ul>
      </nav>
      <Button onClick={onWalletButtonClick} disabled={Boolean(account)}>
        {account
          ? `${account.slice(0, 7)}...${account.slice(-5)}`
          : 'Connect Wallet'}
      </Button>
    </header>
  )
}

export default Header
