<template>
  <MainLayout>
    <h2 class="text-2xl font-semibold mb-4">Pokemon List</h2>
    
    <!-- Grid -->
    <div class="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        class="bg-white hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer rounded shadow-lg h-80">
        <router-link 
            :to="{ name: 'AddPokemon', query: { name: pokemon.name, image: pokemon.image, types: pokemon.types } }"
            class="h-full flex flex-col items-center justify-center py-2">
            <img 
                v-show="!pokemon.isImageLoading"
                :src="pokemon.image || 'https://cdn-icons-png.flaticon.com/512/419/419467.png'" 
                :alt="pokemon.name" 
                class="w-full h-3/4 object-contain"
                @load="pokemon.isImageLoading = false"
                @error="pokemon.isImageLoading = false" />

            <!-- Placeholder while loading -->
            <div v-show="pokemon.isImageLoading" class="w-full h-3/4 flex items-center justify-center bg-gray-100 animate-pulse">
                <img src="https://cdn-icons-png.flaticon.com/512/188/188987.png" alt="Loading..." class="w-12 h-12 opacity-50" />
            </div>

            <p class="text-center mt-2 capitalize">{{ pokemon.name }}</p>
            <div class="flex gap-1 flex-wrap justify-center items-center mt-1 px-2">
                <span v-for="type in pokemon.types" :key="type" class="px-2 py-0.5 rounded-full text-xs text-white capitalize" :class="typeColorClass(type)" >
                {{ type }}
                </span>
            </div>
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <div >
        <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="goToPage"
        />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import Pagination from '../components/Pagination.vue'
import { fetchPokemonList } from '../services/pokemonListService'

const pokemons = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = 20
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

const loadPokemons = async () => {
  const offset = (currentPage.value - 1) * pageSize
  try {
    const { pokemons: list, count } = await fetchPokemonList(pageSize, offset)
    pokemons.value = list
    totalCount.value = count
  } catch (error) {
    console.error('Could not load Pokémon:', error)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadPokemons()
  }
}

onMounted(loadPokemons)

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
