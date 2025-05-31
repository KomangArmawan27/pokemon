<template>
  <aside class="w-64 bg-gray-100 p-4 h-full border-r border-gray-300">
    <h2 class="text-xl flex items-center font-semibold mt-3 mb-3 cursor-pointer">
      <img src="../assets/profile-user.png" alt="Logo" class="h-8 inline-block mr-2" />
      <p>Komang</p>
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
            Pokemon
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="block p-2 rounded hover:bg-gray-200"
            :class="{ 'bg-gray-300 font-semibold': $route.path === '/about' }"
          >
            About
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
