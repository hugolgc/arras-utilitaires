<template>
  <header class="py-5">
    <div class="max-w-screen-xl px-5 mx-auto flex justify-between items-center">
      <!-- <h1 class="font-bold text-xl md:text-3xl lg:text-4xl">🚘 Arras Utilitaires</h1> -->
      <div class="flex items-center space-x-8">
        <img
          v-if="dark"
          :style="{ maxWidth: '8rem' }"
          src="./assets/logo2.png"
          alt="Logo Arras Utilitaires"
        />
        <img
          v-else
          :style="{ maxWidth: '8rem' }"
          src="./assets/logo.png"
          alt="Logo Arras Utilitaires"
        />
        <button @click="setDark()" class="block px-2 py-1 bg-gray-50 border-gray-200 border rounded text-gray-400 dark:text-gray-500 text-sm focus:outline-none dark:bg-gray-800 dark:border-gray-700">Mode {{ dark ? 'nuit' : 'jour' }}</button>
      </div>
      <div @click="engine(true)" class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <nav id="menu" class="hidden md:flex absolute top-0 right-0 h-screen left-0 bg-white dark:bg-gray-900 flex-col space-y-6 md:space-y-0 py-12 px-8 md:static md:h-auto md:flex-row md:p-0 md:divide-x dark:divide-gray-700 divide-gray-300">
        <router-link @click="engine(false)" to="/compagnies" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold md:text-base md:font-normal lg:px-5">
          <span class="md:hidden lg:inline">🏢&nbsp;</span>
          <span class="ml-4 md:ml-1">Entreprises</span>
        </router-link>
        <router-link @click="engine(false)" to="/cars" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold md:text-base md:font-normal lg:px-5">
          <span class="md:hidden lg:inline">🚘&nbsp;</span>
          <span class="ml-4 md:ml-1">Véhicules</span>
        </router-link>
        <router-link @click="engine(false)" to="/drivers" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold md:text-base md:font-normal lg:px-5">
          <span class="md:hidden lg:inline">👨‍⚕️&nbsp;</span>
          <span class="ml-4 md:ml-1">Conducteurs</span>
        </router-link>
        <router-link @click="engine(false)" to="/suppliers" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold md:text-base md:font-normal lg:px-5">
          <span class="md:hidden lg:inline">⚙️&nbsp;</span>
          <span class="ml-4 md:ml-1">Fournisseurs</span>
        </router-link>
        <div @click="logout()" class="pl-6 md:pl-0 md:px-3 text-2xl font-semibold md:text-base md:font-normal lg:px-5 cursor-pointer">
          <span class="md:hidden lg:inline">🚶‍♂️&nbsp;</span>
          <span class="ml-4 md:ml-1">Déconnexion</span>
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
import './assets/styles.css'
import dotenv from 'dotenv'
import api from './api'

dotenv.config()

export default {
  data() {
    return {
      dark: (localStorage.getItem('dark') === 'true' ? true : false) || false
    }
  },
  methods: {
    logout() {
      this.engine(false)
      localStorage.clear()
      this.$router.push('/')
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
    },
    setDark() {
      if (this.dark) {
        this.dark = false
        localStorage.setItem('dark', false)
        document.getElementsByTagName('html')[0].className = ''
      } else {
        this.dark = true
        localStorage.setItem('dark', true)
        document.getElementsByTagName('html')[0].className = 'dark'
      }
    }
  },
  beforeMount() {
    if (localStorage.getItem('token')) api.get('/compagnies').catch(() => this.logout())
    if (!localStorage.getItem('dark')) localStorage.setItem('dark', false)
    else if (this.dark) document.getElementsByTagName('html')[0].className = 'dark'
  }
}
</script>
