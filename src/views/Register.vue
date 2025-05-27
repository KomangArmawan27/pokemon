<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block mb-1 font-semibold">Name</label>
          <input
            id="name"
            type="text"
            v-model="name"
            placeholder="Your Name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-1 font-semibold">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="you@example.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-1 font-semibold">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="••••••••"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
          <ul v-if="Array.isArray(error)">
            <li v-for="(errMsg, idx) in error" :key="idx">• {{ errMsg }}</li>
          </ul>
          <p v-else>{{ error }}</p>
        </div>

        <div class="flex flex-col gap-2 justify-center items-center">
          <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Register
          </button>
          <p class="py-2 text-center">
            Already have an account? <router-link to="/login" class="text-green-500 hover:text-green-400">Login</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/authService'

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  try {
    const res = await register(email.value, name.value, password.value)
    if (res.success) {
      router.push('/login')
    } else {
      error.value = res.message
    }
  } catch (err) {
    const backend = err.response?.data
    if (backend?.data?.validation_errors?.length) {
      error.value = backend.data.validation_errors
    } else {
      error.value = backend?.message || 'Register failed'
    }
  }
}
</script>
