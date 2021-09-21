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
          placeholder="Chercher un conducteur"
          maxlength="255"
          class="w-full py-3 text-gray-400 focus:outline-none"
        />
      </div>
      <div class="border-t overflow-auto" :style="{ maxHeight: '70vh' }">
        <table class="w-full table-auto divide-y">
          <tbody class="divide-y">
            <tr
              v-for="driver in search"
              :key="driver.id"
              class="divide-x hover:bg-gray-100 duration-200"
            >
              <td @click="save(driver.id)" class="px-4 py-2 font-semibold cursor-pointer">{{ driver.name }}</td>
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
    },
    save(driver) {
      api.put(`/cars/${ this.$route.params.id }`, {
        driver: driver
      }).then(() => {
        this.$emit('fetch')
        this.$router.push('/cars')
      })
    }
  },
  computed: {
    search() {
      return this.drivers.filter(driver => {
        return driver.name.toLowerCase().includes(this.input.toLowerCase())
      }).reverse()
    }
  },
  mounted() {
    this.get()
  }
}
</script>