<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-white">
    <form
      @submit.prevent="login"
      method="post"
      class="w-full max-w-sm px-5"
    >
    <label for="email" class="block mb-1 text-gray-400 text-sm">E-mail</label>
    <input
      v-model="email"
      id="email"
      type="email"
      placeholder="Entrez votre adresse email"
      maxlength="255"
      required
      :class="[ error ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200' ]"
      class="block w-full h-10 px-2  border rounded font-light mb-4 focus:outline-none"
    />
    <label for="password" class="block mb-1 text-gray-400 text-sm">Mot de passe</label>
    <input
      v-model="password"
      id="password"
      type="password"
      placeholder="Entrez votre mot de passe"
      maxlength="255"
      required
      :class="[ error ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200' ]"
      class="block w-full h-10 px-2 bg-gray-50 border border-gray-200 rounded font-light mb-6 focus:outline-none"
    />
    <button type="submit" class="block w-full h-10 bg-red-50 border border-red-200 rounded text-red-400 font-medium hover:bg-red-100 duration-200 shadow">Connexion</button>
  </form>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../api'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:1337/auth/local', {
        identifier: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.data.jwt)
        localStorage.setItem('role', res.data.user.role.type)
        this.$router.go()
      }).catch(() => {
        this.error = true
      })
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      api.get('/drivers').then(res => {
        localStorage.setItem('drivers', JSON.stringify(res.data))
        this.$router.push('/compagnies')
      })
    }
  }
}
</script>