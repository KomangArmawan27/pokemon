<template>
  <header class="bg-white shadow p-4 flex justify-between items-center sticky">
    <!-- Mobile menu button -->
    <button class="md:hidden" @click="$emit('toggleSidebar')">
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <h1 class="text-lg md:text-xl font-bold"><router-link to="/">My Pokemon</router-link></h1>
    <nav>
      <ul class="md:flex items-center hidden">
        <li><router-link to="/" class="text-gray-700 hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer px-4 py-2 rounded">Home</router-link></li>
        <li><router-link to="/pokemon-list" class="text-gray-700 hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer px-4 py-2 rounded">Pokémon</router-link></li>
        <li><button @click="handleLogout" class="text-gray-700 hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer px-4 py-2 rounded">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  if (window.confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('token')  // Clear the auth token
    router.push({ name: 'Login' })    // Redirect to login page
  }
}
</script>