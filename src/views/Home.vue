<template>
  <MainLayout>
    <div class="flex justify-between px-3">
      <h2 class="text-lg md:text-xl lg:text-2xl font-semibold mb-4">My Favorite Pokemon &gt;_&lt;</h2>
      <div :class="[
        'w-fit h-fit px-2 py-2 bg-white hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer rounded',
        isFiltering ? 'ring-2 ring-gray-500' : ''
        ]" @click="filterToggle">
        <img src="../assets/filter.png" class="w-6 h-6" alt="Filter Icon" />
      </div>
    </div>

    <!-- Filter Section -->
    <div class="grid grid-cols-3 md:grid-cols-5 px-3 gap-4 my-2 " v-if="isFiltering">
      <!-- Pokémon Name -->
      <div>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Enter Pokémon name"
          class="w-full px-3 py-2 border border-gray-300 text-xs md:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
        />
      </div>

      <!-- Pokémon Type -->
      <div>
        <select
            id="type"
            v-model="type"
            class="w-full px-3 py-2 border border-gray-300 text-xs md:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
          >
            <option value="">All Types</option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="ice">Ice</option>
            <option value="fighting">Fighting</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="flying">Flying</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="rock">Rock</option>
            <option value="ghost">Ghost</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="steel">Steel</option>
            <option value="fairy">Fairy</option>
          </select>
      </div>

      <!-- Notes -->
      <div>
        <input
          type="text"
          id="notes"
          v-model="notes"
          placeholder="Enter notes"
          class="w-full px-3 py-2 border border-gray-300 text-xs md:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
        />
      </div>

      <div class="flex flex-row gap-2">
        <!-- Sort Field -->
        <div class="w-2/4">
          <select
            id="sort_by"
            v-model="sort_by"
            class="w-full px-3 py-2 border border-gray-300 text-xs md:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div class="w-2/4">
          <select
            id="order"
            v-model="order"
            class="w-full px-3 py-2 border border-gray-300 text-xs md:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
          >
            <option value="">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <!-- search icon -->
      <div class="flex items-center w-fit bg-white hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer rounded px-2 py-2"
      @click="filterPokemon()"
      >
        <img src="../assets/search.png" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" alt="Search">
      </div>
    </div>

    <!-- Grid -->
    <div v-if="!pokemonNotFound">
      <div v-if="favoritePokemons.length > 0" class="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="pokemon in favoritePokemons"
          :key="pokemon.ID"
          class="bg-white hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer rounded shadow-lg md:h-64">
          <router-link 
              :to="{ name: 'UpdatePokemon', query: { ID: pokemon.ID, name: pokemon.name, image: pokemon.sprite, types: pokemon.type.split(', '), notes: pokemon.notes } }"
              class="h-full flex flex-col items-center justify-center py-2">
              <img 
                  :src="pokemon.sprite" 
                  :alt="pokemon.name" 
                  class="w-full md:h-3/4 object-contain" />
  
              <p class="text-center mt-2 capitalize">{{ pokemon.name }}</p>
              <div class="flex gap-1 flex-wrap justify-center items-center mt-1 px-2 pb-2">
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
    </div>
    
    <!-- Pokemon not found when filtering message -->
    <div v-else="pokemonNotFound" class="text-center text-gray-500 py-10">
        <p class="text-lg"> No matching Pokémon found. 😢</p>
    </div>

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
const isFiltering = ref(false)

const name = ref('')
const type = ref('')
const notes = ref('')
const sort_by = ref('')
const order = ref('')

const pokemonNotFound = ref(false)

const filterToggle = () => {
  isFiltering.value = !isFiltering.value
}

const filterPokemon = async (page = 1, limit = 20) => {
  try {
    const { items, currentPage: current, totalPages: total } = 
      await fetchFavoritePokemons(
        page, limit, name.value, type.value, notes.value, sort_by.value, order.value)
    
    // Set image loading flag
    const updatedItems = items.map((pokemon) => ({
      ...pokemon,
      isImageLoading: true
    }))  

    favoritePokemons.value = updatedItems
    currentPage.value = current
    totalPages.value = total
    pokemonNotFound.value = false
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // API returned 404: treat as "no results"
      pokemonNotFound.value = true
      totalPages.value = 1
      currentPage.value = 1
    } else {
      console.error('Failed to load favorites:', error.message)
    }
  }
}

const loadFavorites = async (page = 1) => {
  try {
    const { items, currentPage: current, totalPages: total } = await fetchFavoritePokemons(page)

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
    if (isFiltering.value) {
      filterPokemon(page)
    } else {
      loadFavorites(page)
    }
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
