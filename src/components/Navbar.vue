<template>
  <header class="bg-white shadow p-4 flex justify-between items-center sticky">
    <h1 class="text-xl font-bold"><router-link to="/">My Pokemon</router-link></h1>
    <nav>
      <ul class="flex items-center">
        <li><router-link to="/" class="text-gray-700 hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer px-4 py-2 rounded">Home</router-link></li>
        <li><router-link to="/pokemon-list" class="text-gray-700 hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer px-4 py-2 rounded">Pokemon</router-link></li>
        <li><router-link to="/about" class="text-gray-700 hover:bg-gray-100 transition transform active:scale-95 duration-150 ease-in-out cursor-pointer px-4 py-2 rounded">About</router-link></li>
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