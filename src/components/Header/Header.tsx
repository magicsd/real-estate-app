import Navigation from './Navigation'
import Hero from './Hero'

const Header = ({
  account,
  onWalletButtonClick,
}: {
  account?: string
  onWalletButtonClick: () => Promise<void>
}) => {
  return (
    <header className="relative">
      <Navigation account={account} onWalletButtonClick={onWalletButtonClick} />
      <Hero />
    </header>
  )
}

export default Header
