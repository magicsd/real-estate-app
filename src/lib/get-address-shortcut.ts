const getAddressShortcut = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-5)}`
}

export default getAddressShortcut
