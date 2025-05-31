<template>
  <aside class="w-64 bg-gray-100 p-4 h-full border-r border-gray-300">
    <h2 class="text-xl flex items-center font-semibold mt-3 mb-3 cursor-pointer">
      <img src="../assets/profile-user.png" alt="Logo" class="h-8 inline-block mr-2" />
      <p class="capitalize">{{ userName || 'Guest' }}</p>
    </h2>
    <hr class="mb-4 border-gray-300" />

    <nav>
      <ul class="space-y-2">
        <li>
          <router-link
            to="/"
            class="block p-2 rounded hover:bg-gray-200"
            :class="{ 'bg-gray-300 font-semibold': ['/', '/pokemon-update'].includes($route.path) }"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/pokemon-list"
            class="block p-2 rounded hover:bg-gray-200"
            :class="{ 'bg-gray-300 font-semibold': ['/pokemon-list', '/pokemon-add'].includes($route.path) }"
          >
            Pokémon
          </router-link>
        </li>
        <li>
          <div
            class="block p-2 rounded hover:bg-gray-200 cursor-pointer"
            :class="{ 'bg-gray-300 font-semibold': $route.path === '/about' }"
            @click="handleLogout"
            >
            Logout
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// get user name from localStorage
const userName = ref('')

onMounted(() => {
  const storedName = localStorage.getItem('user_name')
  if (storedName) {
    userName.value = storedName
  }
})

// hande logout
const router = useRouter()

function handleLogout() {
  if (window.confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('token')  // Clear the auth token
    router.push({ name: 'Login' })    // Redirect to login page
  }
}

</script>
