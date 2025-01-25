import { type AbstractProvider, BrowserProvider, ethers } from 'ethers'

export type Contract = ethers.Contract

export type ProviderState = BrowserProvider | AbstractProvider

type Trait = {
  trait_type: string
  value: string | number
}

export type Home = {
  id: string
  name: string
  description: string
  address: string
  image: string
  attributes: Trait[]
}
