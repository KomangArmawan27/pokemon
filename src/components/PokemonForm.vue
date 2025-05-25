<template>
  <form class= "max-w-md w-full mx-auto space-y-4" @submit.prevent="handleSubmit">
    <h2 class="text-2xl font-semibold text-gray-800">Favorite this Pokémon</h2>

    <!-- Name -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Pokémon Name</label>
      <input
        type="text"
        id="name"
        v-model="name"
        placeholder="e.g. Pikachu"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
        disabled
      />
    </div>

    <!-- Type -->
    <div>
      <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Pokémon Type</label>
      <span 
        v-for="t in type" 
        :key="t" 
        class="px-4 py-2 mx-1 rounded-full text-sm text-white capitalize" :class="typeColorClass(t)">
        {{ t }}
      </span>
    </div>

    <!-- Notes -->
    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
      <textarea
        id="notes"
        v-model="notes"
        rows="3"
        maxlength="30"
        placeholder="Any special traits or memories..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-row gap-2">
      <button 
        v-if="props.mode === 'create'"
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200" >
        Save Pokémon
      </button>
      
      <button 
        v-if="props.mode === 'update'"
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200" >
        Save Updates
      </button>

      <button
        v-if="props.mode === 'update'"
        type="button"
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
        @click="handleDelete">
        Delete Pokémon
      </button>
    </div>

  </form>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, defineProps, watch } from 'vue'
import { createFavoritePokemon, updateFavoritePokemon, deleteFavoritePokemon } from '../services/pokemonFavorite'

const router = useRouter()


const props = defineProps({
  name: String,
  type: Array,
  sprite: String,
  notes: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'create'
  },
  id: {
    type: Number,
    default: null
  }
})


const name = ref(props.name)
const type = ref(props.type)
const notes = ref(props.notes)
const sprite = ref(props.sprite)

// Sync with prop updates
watch(() => props.notes, (newVal) => {
  notes.value = newVal || ''
})


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

const handleSubmit = async () => {
  const userEmail = localStorage.getItem('user_email')
  
  const payload = {
    name: name.value,
    notes: notes.value,
    sprite: sprite.value,
    type: type.value.join(', '),
    userEmail
  }

  try {
    if (props.mode === 'update' && props.id) {
      await updateFavoritePokemon(props.id, payload)
      alert('Pokémon updated successfully!')
    } else {
      await createFavoritePokemon(payload)
      alert('Pokémon favorited successfully!')
      notes.value = ''
    }
  } catch (error) {
    alert('Failed to save Pokémon.')
  }
}

const handleDelete = async () => {
  const token = localStorage.getItem('token')
  try {
    await deleteFavoritePokemon(token, props.id)
    alert('Pokémon deleted successfully!')
    router.push('/')
  } catch (error) {
    alert('Failed to delete Pokémon.')
  }
}
</script>
