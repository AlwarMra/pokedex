interface Pokedex {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

interface Pokemon {
  id: string
  name: string
  sprites: { front_default: string }
}

export type { Pokedex, Pokemon }
