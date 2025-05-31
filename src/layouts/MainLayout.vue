<template>
  <div class="flex h-screen">
    <!-- sidebar -->
    <Sidebar class="hidden md:block" />
    <!-- drawer for mobile -->
     <div class="fixed inset-0  bg-opacity-25 z-40 md:hidden" v-if="showSidebar" @click="toggleSidebar">
     </div>
     <div
      class="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 md:hidden"
      :class="{ '-translate-x-full': !showSidebar, 'translate-x-0': showSidebar }"
    >
      <Sidebar />
    </div>

    <div class="flex-1 flex flex-col">
      <Navbar @toggleSidebar="toggleSidebar" />
      <main class="p-4 overflow-auto flex-1">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

</script>
