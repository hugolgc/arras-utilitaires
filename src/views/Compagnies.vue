<template>
  <section class="pt-20 pb-10">
    <div class="max-w-screen-xl px-5 mx-auto">
      <div class="mb-10 flex justify-between items-center space-x-5">
        <div class="flex flex-auto items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="input"
            type="text"
            placeholder="Chercher une entreprise"
            maxlength="255"
            class="w-full text-gray-400 focus:outline-none"
          />
        </div>
        <button @click="$router.push('/compagnies/add')" class="block px-2 py-1 bg-gray-50 border-gray-200 border rounded text-gray-400 text-sm focus:outline-none">Ajouter</button>
      </div>
      <div class="overflow-auto">
        <table :style="{ minWidth: '600px' }" class="w-full table-auto divide-y border-t border-b">
          <thead class="text-left text-gray-400">
            <tr class="divide-x">
              <th class="px-2 py-1 font-normal">Nom</th>
              <th class="px-2 py-1 font-normal">Adresse</th>
              <th class="px-2 py-1 font-normal">Véhicules</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="compagny in search"
              :key="compagny.id"
              class="divide-x hover:bg-gray-100 duration-200"
            >
              <td @click="$router.push(`/compagnies/edit/${ compagny.id }`)" class="px-2 py-1 font-semibold cursor-pointer">{{ compagny.name }}</td>
              <td class="px-2 py-1 select-all">{{ compagny.adress }}</td>
              <td class="px-2 py-1 font-semibold select-all">
                <span
                  v-for="car in compagny.cars"
                  :key="car.id"
                >{{ car.model }}, </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <router-view v-on:fetch="get" />
</template>

<script>
import api from '../api'

export default {
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
    setData() {
      api.get('/drivers').then(res => {
        localStorage.setItem('drivers', JSON.stringify(res.data))
      })
      api.get('/cars').then(res => {
        localStorage.setItem('cars', JSON.stringify(res.data))        
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
  beforeMount() {
    if (!localStorage.getItem('token')) this.$router.push('/')
  },
  mounted() {
    this.get()
    this.setData()
  }
}
</script>