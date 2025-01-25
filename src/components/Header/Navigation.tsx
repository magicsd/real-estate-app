import Link from './Link'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { getAddressShortcut } from '@/lib'

const Navigation = ({
  account,
  onWalletButtonClick,
}: {
  account?: string
  onWalletButtonClick: () => Promise<void>
}) => {
  return (
    <nav>
      <div className="px-6">
        <div className="flex items-center h-16">
          <div className="flex-1">
            <button
              type="button"
              className="size-8 flex items-center justify-center sm:hidden"
            >
              <Menu size="24" />
            </button>

            <ul className="items-center gap-12 text-sm font-semibold hidden sm:flex">
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
          </div>

          <a href="/">
            <Logo />
          </a>

          <div className="flex justify-end flex-1">
            {account ? (
              <div
                title={account}
                className="h-10 px-4 flex items-center text-sm cursor-default"
              >
                {getAddressShortcut(account)}
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={onWalletButtonClick}
                disabled={Boolean(account)}
              >
                Connect Wallet...
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
