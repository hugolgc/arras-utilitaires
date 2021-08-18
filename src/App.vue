<template>
  <header class="py-5">
    <div class="max-w-screen-xl px-5 mx-auto flex justify-between items-center">
      <h1 class="font-bold text-4xl">🚘 Arras Utilitaires</h1>
      <nav class="flex divide-x divide-gray-300">
        <router-link to="/compagnies" class="px-5">🏢 Entreprises</router-link>
        <router-link to="/cars" class="px-5">🚘 Véhicules</router-link>
        <router-link to="/drivers" class="px-5">👨‍⚕️ Conducteurs</router-link>
        <div @click="logout()" class="px-5 cursor-pointer">🚶‍♂️ Déconnexion</div>
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
      localStorage.clear()
      this.$router.push('/')
    }
  },
  mounted() {
    if (localStorage.getItem('token')) api.get('/compagnies').catch(() => {
      this.logout()
    })
  }
}
</script>
