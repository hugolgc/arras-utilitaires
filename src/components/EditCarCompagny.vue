<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center">
    <div @click="$router.push('/cars')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white shadow-2xl">
      <div class="flex flex-auto items-center px-4 space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="input"
          type="text"
          placeholder="Chercher une entreprise"
          maxlength="255"
          class="w-full py-3 text-gray-400 focus:outline-none"
        />
      </div>
      <div class="border-t">
        <table class="w-full table-auto divide-y">
          <tbody class="divide-y">
            <tr
              v-for="compagny in search"
              :key="compagny.id"
              class="divide-x hover:bg-gray-100 duration-200"
            >
              <td @click="save(compagny.id)" class="px-4 py-2 font-semibold cursor-pointer">{{ compagny.name }}</td>
              <td class="px-4 py-2">{{ compagny.adress }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="save(null)" class="block w-full p-3 border-t text-gray-400 focus:outline-none">Retirer</button>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  emits: ['fetch'],
  data() {
    return {
      compagnies: localStorage.getItem('compagnies') ? JSON.parse(localStorage.getItem('compagnies')) : [],
      input: ''
    }
  },
  methods: {
    get() {
      api.get('/compagnies').then(res => {
        this.compagnies = res.data
        localStorage.setItem('compagnies', JSON.stringify(res.data))
      })
    },
    save(compagny) {
      api.put(`/cars/${ this.$route.params.id }`, {
        compagny: compagny
      }).then(() => {
        this.$emit('fetch')
        this.$router.push('/cars')
      })
    }
  },
  computed: {
    search() {
      return this.compagnies.filter(compagny => {
        return compagny.name.toLowerCase().includes(this.input.toLowerCase())
        || compagny.adress.toLowerCase().includes(this.input.toLowerCase())
      }).reverse()
    }
  },
  mounted() {
    this.get()
  }
}
</script>