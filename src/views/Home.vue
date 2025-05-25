<template>
  <MainLayout>
    <h2 class="text-2xl font-semibold mb-4">My Favorite Pokemon &gt;_&lt;</h2>

    <!-- Grid -->
    <div v-if="favoritePokemons.length > 0" class="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="pokemon in favoritePokemons"
        :key="pokemon.ID"
        class="bg-white hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer rounded shadow-lg h-80">
        <router-link 
            :to="{ name: 'UpdatePokemon', query: { ID: pokemon.ID, name: pokemon.name, image: pokemon.sprite, types: pokemon.type.split(', '), notes: pokemon.notes } }"
            class="h-full flex flex-col items-center justify-center py-2">
            <img 
                :src="pokemon.sprite" 
                :alt="pokemon.name" 
                class="w-full h-3/4 object-contain" />

            <p class="text-center mt-2 capitalize">{{ pokemon.name }}</p>
            <div class="flex gap-1 flex-wrap justify-center items-center mt-1 px-2">
                <span v-for="type in pokemon.type.split(', ')" :key="type" class="px-2 py-0.5 rounded-full text-xs text-white capitalize" :class="typeColorClass(type)" >
                {{ type }}
                </span>
            </div>
        </router-link>
      </div>
    </div>

    <!-- Empty state message -->
    <div v-else class="text-center text-gray-500 py-10">
        <p class="text-lg">You haven’t added any favorite Pokémon yet 😢</p>
    </div>

    <Pagination
        v-if="favoritePokemons.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change="changePage"
    />
  </MainLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import Pagination from '../components/Pagination.vue'
import { fetchFavoritePokemons } from '../services/pokemonFavorite.js'

const favoritePokemons = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const token = localStorage.getItem('token')

const loadFavorites = async (page = 1) => {
  try {
    const { items, currentPage: current, totalPages: total } = await fetchFavoritePokemons(token, page)

    // Set image loading flag
    const updatedItems = items.map((pokemon) => ({
      ...pokemon,
      isImageLoading: true
    }))

    favoritePokemons.value = updatedItems
    currentPage.value = current
    totalPages.value = total
  } catch (error) {
    console.error('Failed to load favorites:', error.message)
  }
}


const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    loadFavorites(page)
  }
}

onMounted(() => {
  loadFavorites(currentPage.value)
})

// Color class mapping
const typeColorClass = (type) => {
  const colors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400 text-black',
    ice: 'bg-blue-200 text-black',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300 text-black',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-600',
    rock: 'bg-gray-600',
    ghost: 'bg-indigo-700',
    dark: 'bg-gray-800',
    dragon: 'bg-indigo-600',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300 text-black',
  }

  return colors[type] || 'bg-gray-300 text-black'
}
</script>
