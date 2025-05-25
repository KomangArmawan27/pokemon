import axios from 'axios'

const BASE_URL = 'https://gopoke-production.up.railway.app/api/v1'

// get
export async function fetchFavoritePokemons(token, page = 1, limit = 20) {
  const userEmail = localStorage.getItem('user_email')
  if (!userEmail) throw new Error('User email not found in localStorage')

  try {
    const res = await fetch(`${BASE_URL}/pokemons?page=${page}&limit=${limit}&user_email=${encodeURIComponent(userEmail)}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const json = await res.json()
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
  const token = localStorage.getItem('token') 

  if (!token) throw new Error('User is not authenticated')

  try {
    const response = await axios.post(
      `${BASE_URL}/pokemon/create`,
      {
        name,
        notes,
        sprite,
        type,
        userEmail
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error favoriting Pokémon:', error)
    throw error
  }
}

// update
export async function updateFavoritePokemon(id, data) {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('User is not authenticated')

  const response = await axios.put(
    `${BASE_URL}/pokemon/update?id=${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )

  return response.data
}

// delete
export async function deleteFavoritePokemon(token, id) {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const json = await res.json()

    if (res.ok && json.success) {
      return json.message || 'Deleted successfully'
    } else {
      throw new Error(json.message || 'Failed to delete Pokémon')
    }
  } catch (error) {
    console.error('Error deleting Pokémon:', error)
    throw error
  }
}
