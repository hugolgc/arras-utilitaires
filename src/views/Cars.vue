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
            placeholder="Chercher un véhicule"
            maxlength="255"
            class="w-full text-gray-400 focus:outline-none"
          />
        </div>
        <button @click="$router.push('/cars/add')" class="block px-2 py-1 bg-gray-50 border-gray-200 border rounded text-gray-400 text-sm focus:outline-none">Ajouter</button>
      </div>
      <div class="overflow-scroll">
        <table :style="{ minWidth: '600px' }" class="w-full table-auto divide-y border-t border-b">
          <thead class="text-left text-gray-400">
            <tr class="divide-x">
              <th class="px-2 py-1 font-normal">Modèle</th>
              <th class="px-2 py-1 font-normal">Numéro de série</th>
              <th class="px-2 py-1 font-normal">Mise en service</th>
              <th class="px-2 py-1 font-normal">Entreprise</th>
              <th class="px-2 py-1 font-normal">Conducteur</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="car in search"
              :key="car.id"
              class="divide-x hover:bg-gray-100 duration-200"
            >
              <td @click="$router.push(`/cars/edit/${ car.id }`)" class="px-2 py-1 font-semibold cursor-pointer">{{ car.model }}</td>
              <td class="px-2 py-1 select-all">{{ car.serie }}</td>
              <td class="px-2 py-1 capitalize select-all">{{ setDate(car.service) }}</td>
              <td @click="$router.push(`/cars/compagny/${ car.id }`)" class="px-2 py-1 font-semibold cursor-pointer">{{ car.compagny ? car.compagny.name : '' }}</td>
              <td @click="$router.push(`/cars/driver/${ car.id }`)" class="px-2 py-1 font-semibold cursor-pointer">{{ car.driver ? car.driver.name : '' }}</td>
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
      cars: localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [],
      input: ''
    }
  },
  methods: {
    get() {
      api.get('/cars').then(res => {
        this.cars = res.data
        localStorage.setItem('cars', JSON.stringify(res.data))        
      })
    },
    setDate(slug) {
      let date = new Date(slug)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
  },
  computed: {
    search() {
      return this.cars.filter(car => {
        return car.model.toLowerCase().includes(this.input.toLowerCase())
        || car.serie.toLowerCase().includes(this.input.toLowerCase())
        || car.service.toLowerCase().includes(this.input.toLowerCase())
      }).reverse()
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) this.$router.push('/')
    this.get()
  }
}
</script>