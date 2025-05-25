// services/pokemonListService.js
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemonList(limit = 20, offset = 0) {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`)
    const basicList = response.data.results
    const count = response.data.count

    const detailedList = await Promise.all(
      basicList.map(async (pokemon) => {
        const res = await axios.get(pokemon.url)
        
        // Extract types names, sorted by slot number (slot 1 first)
        const types = res.data.types
          .sort((a, b) => a.slot - b.slot)
          .map(typeInfo => typeInfo.type.name)

        return {
          name: pokemon.name,
          image: res.data.sprites.other['official-artwork'].front_default,
          types: types,
          isImageLoading: true
        }
      })
    )

    return { pokemons: detailedList, count }
  } catch (error) {
    console.error('Error fetching Pokémon list:', error)
    throw error
  }
}
