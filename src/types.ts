import { ethers } from 'ethers'

export type Contract = ethers.Contract

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
