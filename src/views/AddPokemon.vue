<template>
  <MainLayout>
    <div class="flex p-2 gap-4">
      <img 
        :src="selectedPokemon?.image || placeholderImage" 
        :alt="selectedPokemon?.name || 'Pokemon Placeholder'" 
        class="w-2/4 h-auto object-contain" />
      <PokemonForm
        :name="selectedPokemon.name"
        :type="selectedPokemon.type"
        :sprite="selectedPokemon.image"
        mode="create" />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import PokemonForm from '../components/PokemonForm.vue'

const route = useRoute()
const selectedPokemon = ref({
  name: route.query.name || '',
  image: route.query.image || '',
  type: route.query.types || ''
})

const placeholderImage = 'https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-list-6895600_640.png'

</script>

