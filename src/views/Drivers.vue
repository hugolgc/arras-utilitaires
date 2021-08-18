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
            placeholder="Chercher un conducteur"
            maxlength="255"
            class="w-full text-gray-400 focus:outline-none"
          />
        </div>
        <button @click="$router.push('/drivers/add')" class="block px-2 py-1 bg-gray-50 border-gray-200 border rounded text-gray-400 text-sm focus:outline-none">Ajouter</button>
      </div>
      <table class="w-full table-auto divide-y border-t border-b">
        <thead class="text-left text-gray-400">
          <tr class="divide-x">
            <th class="px-2 py-1 font-normal">Nom</th>
            <th class="px-2 py-1 font-normal">Téléphone</th>
            <th class="px-2 py-1 font-normal">Email</th>
            <th class="px-2 py-1 font-normal">Adresse</th>
            <th class="px-2 py-1 font-normal">Véhicules</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr
            v-for="driver in search"
            :key="driver.id"
            class="divide-x hover:bg-gray-100 duration-200"
          >
            <td @click="$router.push(`/drivers/edit/${ driver.id }`)" class="px-2 py-1 font-semibold cursor-pointer">{{ driver.name }}</td>
            <td class="px-2 py-1">{{ driver.phone }}</td>
            <td class="px-2 py-1">{{ driver.email }}</td>
            <td class="px-2 py-1">{{ driver.adress }}</td>
            <td class="px-2 py-1 font-semibold">
              <span
                v-for="car in driver.cars"
                :key="car.id"
              >{{ car.model }}, </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <router-view v-on:fetch="get" />
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      drivers: localStorage.getItem('drivers') ? JSON.parse(localStorage.getItem('drivers')) : [],
      input: ''
    }
  },
  methods: {
    get() {
      api.get('/drivers').then(res => {
        this.drivers = res.data
        localStorage.setItem('drivers', JSON.stringify(res.data))
      })
    }
  },
  computed: {
    search() {
      return this.drivers.filter(driver => {
        return driver.name.toLowerCase().includes(this.input.toLowerCase())
        || driver.phone.toLowerCase().includes(this.input.toLowerCase())
        || driver.email.toLowerCase().includes(this.input.toLowerCase())
        || driver.adress.toLowerCase().includes(this.input.toLowerCase())
      }).reverse()
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) this.$router.push('/')
    this.get()
  }
}
</script>