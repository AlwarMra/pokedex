import { Pokedex, Pokemon } from '../interfaces'

const url = 'https://pokeapi.co/api/v2/pokemon/'

function getPokedex(): Promise<Pokedex['results']> {
  return fetch(url, { method: 'GET' })
    .then(res => {
      return res.json()
    })
    .then((res: Pokedex) => {
      return res.results
    })
}

function getPokemon(url: string): Promise<Pokemon> {
  return fetch(url, { method: 'GET' })
    .then(res => {
      return res.json()
    })
    .then(res => {
      return res
    })
}

export { getPokedex, getPokemon }
