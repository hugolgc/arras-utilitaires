<template>
  <header class="py-5">
    <div class="max-w-screen-xl px-5 mx-auto flex justify-between items-center">
      <h1 class="font-bold text-xl md:text-3xl lg:text-4xl">🚘 Arras Utilitaires</h1>
      <div @click="engine(true)" class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <nav id="menu" class="hidden md:flex absolute top-0 right-0 h-screen left-0 bg-white flex-col space-y-6 md:space-y-0 py-12 px-8 md:static md:h-auto md:flex-row md:p-0 md:divide-x divide-gray-300">
        <router-link @click="engine(false)" to="/compagnies" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold space-x-4 md:text-base md:font-normal md:space-x-1 lg:px-5">
          <span class="md:hidden lg:inline">🏢</span>
          <span>Entreprises</span>
        </router-link>
        <router-link @click="engine(false)" to="/cars" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold space-x-4 md:text-base md:font-normal md:space-x-1 lg:px-5">
          <span class="md:hidden lg:inline">🚘</span>
          <span>Véhicules</span>
        </router-link>
        <router-link @click="engine(false)" to="/drivers" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold space-x-4 md:text-base md:font-normal md:space-x-1 lg:px-5">
          <span class="md:hidden lg:inline">👨‍⚕️</span>
          <span>Conducteurs</span>
        </router-link>
        <div @click="logout()" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold space-x-4 md:text-base md:font-normal md:space-x-1 lg:px-5 cursor-pointer">
          <span class="md:hidden lg:inline">🚶‍♂️</span>
          <span>Déconnexion</span>
        </div>
        <div @click="engine(false)" class="pl-6 text-2xl font-semibold space-x-4 md:hidden">
          <span>⬅️</span>
          <span>Retour</span>
        </div>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<script>
import './assets/tailwind.css'
import api from './api'

export default {
  methods: {
    logout() {
      console.log('logout')
      localStorage.clear()
      this.$router.push('/')
      this.engine(false)
    },
    engine(state) {
      let menu = document.getElementById('menu')
      if (state) {
        menu.classList.remove('hidden')
        menu.classList.add('flex')
      } else {
        menu.classList.remove('flex')
        menu.classList.add('hidden')
      }
    }
  },
  mounted() {
    if (localStorage.getItem('token')) api.get('/compagnies').catch(() => {
      this.logout()
    })
  }
}
</script>
