<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center">
    <div @click="$router.push(`/cars/edit/${ car.id }`)" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-75"></div>
    <div class="z-10 w-full max-w-screen-md bg-white shadow-2xl">
      <div v-if="car.mileages && car.mileages.length > 1" class="flex justify-between px-4 py-3">
        <p class="text-gray-400">Choisir deux dates</p>
        <p v-if="choices.length > 1" class="space-x-4 font-semibold">
          <span>{{ getDays }} jours</span>
          <span>{{ spaceNumber(getKilometers) }} km</span>
        </p>
      </div>
      <form
        @submit.prevent="save"
        class="border-t overflow-auto"
        :style="{ maxHeight: '70vh' }"
      >
        <table class="w-full table-auto divide-y">
          <tbody class="divide-y">
            <tr
              v-for="mileage in car.mileages"
              :key="mileage.id"
              :class="[ choices.find(choice => choice.id == mileage.id) ? 'bg-gray-100' : '' ]"
              class="duration-200"
            >
              <td class="px-4 py-2 border-r font-semibold">{{ spaceNumber(mileage.kilometers) }} km</td>
              <td @click="addChoice(mileage)" class="px-4 py-2 cursor-pointer capitalize">{{ setDate(mileage.date) }}</td>
              <td @click="erase(mileage.id)" class="px-2 text-gray-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </td>
            </tr>
            <tr>
              <td class="border-r">
                <input
                  v-model="kilometers"
                  type="number" step="0.1" max="999999999" required
                  placeholder="Saisir un kilométrage"
                  class="w-full h-10 px-4 focus:outline-none"
                />
              </td>
              <td class="flex">
                <input
                  v-model="date"
                  type="text" required
                  placeholder="jj/mm/aaaa"
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  class="w-full h-10 px-4 focus:outline-none"
                />
              </td>
              <td class="px-2">
                <button class="block mx-auto text-gray-300" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  emits: ['update'],
  data() {
    return {
      car: {},
      choices: [],
      kilometers: '',
      date: ''
    }
  },
  methods: {
    spaceNumber(x) {
      let parts = x.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return parts.join('.')
    },
    setDate(slug) {
      let date = new Date(slug)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    addChoice(mileage) {
      if (this.choices.length > 1) this.choices = []
      this.choices.push(mileage)
    },
    erase(id) {
      api.delete(`/mileages/${ id }`).then(() => this.get())
    },
    save() {
      api.post('/mileages', {
        date: this.date.split('/').reverse().join('-'),
        kilometers: this.kilometers,
        car: this.car.id
      }).then(() => {
        this.kilometers = this.date = ''
        this.get()
      })
    },
    get() {
      api.get('/cars').then(res => {
        this.car = res.data.find(car => car.id == this.car.id)
        localStorage.setItem('cars', JSON.stringify(res.data))      
        this.$emit('update')
      })
    }
  },
  computed: {
    getDays() {
      if (this.choices.length > 1) {
        let date1 = new Date(this.choices[1].date)
        let date2 = new Date(this.choices[0].date)
        let difference = date1.getTime() - date2.getTime()
        let days = Math.ceil(difference / 86400000)
        return Math.abs(days)
      } else return 0
    },
    getKilometers() {
      if (this.choices.length > 1) return Math.round(Math.abs(this.choices[1].kilometers - this.choices[0].kilometers) * 10) / 10
      else return 0
    }
  },
  mounted() {
    this.car = JSON.parse(localStorage.getItem('cars')).find(car => car.id == this.$route.params.id) || []
  },
}
</script>