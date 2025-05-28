import http from './http'


const BASE_URL = 'pokemon'

// get
export async function fetchFavoritePokemons(page = 1, limit = 20) {
  const userEmail = localStorage.getItem('user_email')
  if (!userEmail) throw new Error('User email not found in localStorage')

  try {
    const res = await http.get(`/pokemons`, {
      params: {
        page,
        limit,
        user_email: userEmail,
      },
    })

    const json = res.data
    if (json.success) {
      return {
        items: json.data.items,
        currentPage: json.data.currentPage,
        totalPages: json.data.totalPages,
      }
    } else {
      throw new Error(json.message)
    }
  } catch (error) {
    console.error('Error fetching favorite Pokémons:', error)
    throw error
  }
}

// create
export async function createFavoritePokemon({ name, notes, sprite, type, userEmail }) {
  try {
    const response = await http.post(`${BASE_URL}/create`, {
      name,
      notes,
      sprite,
      type,
      userEmail,
    })

    return response.data
  } catch (error) {
    console.error('Error favoriting Pokémon:', error)
    throw error
  }
}

// update
export async function updateFavoritePokemon(id, data) {
  try {
    const response = await http.put(`${BASE_URL}/update`, data, {
      params: { id },
    })

    return response.data
  } catch (error) {
    console.error('Error updating Pokémon:', error)
    throw error
  }
}

// delete
export async function deleteFavoritePokemon(token, id) {
  try {
    const response = await http.delete(`${BASE_URL}/delete`, {
      params: { id },
    })

    const json = response.data

    if (json.success) {
      return json.message || 'Deleted successfully'
    } else {
      throw new Error(json.message || 'Failed to delete Pokémon')
    }
  } catch (error) {
    console.error('Error deleting Pokémon:', error)
    throw error
  }
}
