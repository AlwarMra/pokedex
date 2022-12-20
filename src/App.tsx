import { useEffect, useState } from 'react'
import { getPokedex, getPokemon } from './services/getPokemon'
import { Pokemon } from './interfaces'

function App(): JSX.Element {
  const [initialPokemon, setInitialPokemon] = useState<Pokemon[]>([])
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  function searchPokemon(str: string) {
    const filterPokemon = [...initialPokemon].filter(pkm => {
      if (pkm.name.includes(str.toLocaleLowerCase())) return pkm
    })
    return setPokemon(filterPokemon)
  }

  function orderAlph(arr: Pokemon[], reverse = false): Pokemon[] {
    return [...arr].sort((a, b) => {
      return reverse
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    })
  }

  useEffect(() => {
    getPokedex().then(async res => {
      const pkms = res.slice(0, 4)

      const newPkms = await Promise.all(
        pkms.map(async pkm => {
          return getPokemon(pkm.url).then(newPkm => {
            return {
              name: newPkm.name,
              id: newPkm.name,
              sprites: newPkm.sprites,
            }
          })
        }),
      )
      const orderedPkms = orderAlph(newPkms)
      setInitialPokemon(() => [...orderedPkms])
      setPokemon(() => [...orderedPkms])
    })
  }, [])

  return (
    <div className='App max-w-screen-md mx-auto p-6 m-4'>
      <h1 className='text-xl mb-8'>Pokedex</h1>
      <div className='max-w-xs grid grid-rows-2 grid-cols-2 gap-2 mb-8'>
        <input
          onChange={e => searchPokemon(e.target.value)}
          type='search'
          id='search'
          className='mb-2 col-span-2 rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5'
          placeholder='Search'
        />
        <button
          onClick={() => setPokemon([...orderAlph(pokemon)])}
          type='button'
          className='w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Order A-Z
        </button>
        <button
          onClick={() => setPokemon([...orderAlph(pokemon, true)])}
          type='button'
          className='w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Order Z-A
        </button>
      </div>

      <div className='grid  gap-4 grid-cols-2 md:grid-cols-4'>
        {pokemon.map(pkm => (
          <div key={pkm.id} className='border-cyan-400 text-center'>
            <img
              className='mx-auto'
              src={pkm.sprites.front_default}
              alt={pkm.name}
            />
            <p className='capitalize text-center'>{pkm.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
