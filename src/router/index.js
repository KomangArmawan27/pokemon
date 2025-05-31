import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
// import Dashboard from '../views/Dashboard.vue'
import PokemonList from '../views/PokemonList.vue'
import AddPokemon from '../views/AddPokemon.vue'
import UpdatePokemon from '../views/UpdatePokemon.vue'

const routes = [
  // authentication routes
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },

  // main application routes
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true }},
  { path: '/about', name: 'About', component: About, meta: { requiresAuth: true }},
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true }},
  { path: '/pokemon-list', name: 'PokemonList', component: PokemonList, meta: { requiresAuth: true }},
  { path: '/pokemon-add', name: 'AddPokemon', component: AddPokemon, meta: { requiresAuth: true }},
  { path: '/pokemon-update', name: 'UpdatePokemon', component: UpdatePokemon, meta: { requiresAuth: true }},
]

const router = createRouter({
  history: createWebHistory('/pokemon/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else if ((to.name === 'Login' || to.name === 'Register') && token) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
