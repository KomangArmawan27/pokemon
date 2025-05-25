<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <p v-if="$route.query.registered" class="text-green-500 mb-4">
        Account created successfully! Please log in.
      </p>
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
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
        <div class="flex flex-col gap-2 justify-center items-center">
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Login
          </button>
          <p
            class="py-2">
            Already have an account? <router-link to="/register" class="text-blue-500 hover:text-blue-400">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  try {
    const res = await login(email.value, password.value)
    if (res.success) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user_email', res.data.email)
      router.push('/')
    } else {
      error.value = res.message
    }
  } catch (err) {
    error.value = err.message || 'Login failed'
  }
}
</script>
