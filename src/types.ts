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
