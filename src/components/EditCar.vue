<template>
  <form
    @submit.prevent="save"
    method="post"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="$router.push('/cars')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white shadow-2xl">
      <div class="px-2 py-4 md:px-8 md:py-6 space-y-6 overflow-scroll" :style="{ maxHeight: '70vh' }">
        <table class="w-full table-auto divide-y">
          <tbody>
            <tr>
              <td class="px-2 py-1 text-gray-400">Modèle</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.model"
                  type="text" maxlength="255" required
                  placeholder="Saisir un modèle"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Numéro de série</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.serie"
                  type="text" maxlength="255" required
                  placeholder="Saisir un numéro"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Mise en service</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.service"
                  type="text" required
                  placeholder="jj/mm/aaaa"
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr v-if="car.compagny">
              <td class="px-2 py-1 text-gray-400">Entreprise</td>
              <td class="px-2 py-1 font-semibold">
                <router-link
                  :to="{ path: `/compagnies/edit/${ car.compagny.id }` }"
                  class="block"
                >{{ car.compagny.name }}</router-link>
              </td>
            </tr>
            <tr v-if="car.driver">
              <td class="px-2 py-1 text-gray-400">Conducteur</td>
              <td class="px-2 py-1 font-semibold">
                <router-link
                  :to="{ path: `/drivers/edit/${ car.driver.id }` }"
                  class="block"
                >{{ car.driver.name }}</router-link>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 flex text-gray-400">Kilométrage</td>
              <td @click="$router.push(`/cars/edit/${ car.id }/mileages`)" class="px-2 py-1 cursor-pointer">
                <p
                  v-if="car.mileages && car.mileages.length"
                  class="flex justify-between font-semibold"
                >{{ spaceNumber(car.mileages[car.mileages.length - 1].kilometers) }} km</p>
                <p v-else class="text-gray-400">Ajouter un kilométrage</p>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Roulage annuel</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.rolling"
                  type="text" maxlength="255"
                  placeholder="Saisir un roulage"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Motorisation</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.motor"
                  type="text" maxlength="255"
                  placeholder="Saisir une motorisation"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Plaquettes de frein</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.brakes"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Filtre à carburant</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.fuel"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Filtre à huile</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.oil"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Filtre à air</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.air"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Filtre à air lodge</td>
              <td class="px-2 py-1">
                <input
                  v-model="car.lodge"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 flex text-gray-400">Observation</td>
              <td class="px-2 py-1">
                <textarea
                  v-model="car.observation"
                  type="text" maxlength="3000" rows="3"
                  placeholder="Saisir une observation"
                  class="w-full focus:outline-none"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          <div
            @click="image.path = file.url"
            v-for="file in car.files"
            :key="file.id"
            :style="{ backgroundImage: `url(${ image.domain + file.url })` }"
            class="h-24 bg-center bg-cover cursor-pointer"
          ></div>
          <!-- <div @click="setFile" class="h-24 flex justify-center items-center bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <input
            @change="addFile(car.id)"
            id="upload"
            ref="file"
            type="file"
            hidden
          /> -->
        </div>
      </div>
      <div class="flex divide-x">
        <div class="flex-1 block p-3 border-t text-gray-400 text-center cursor-pointer">Télécharger</div>
        <button class="flex-1 block p-3 border-t text-gray-400 focus:outline-none">Enregistrer</button>
        <div
          v-if="role === 'super_admin'"
          @click="erase"
          class="flex-1 block p-3 border-t text-red-400 text-center cursor-pointer"
        >Supprimer</div>
      </div>
    </div>
  </form>
  <div
    v-if="image.path"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="image.path = false" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <img
      :src="image.domain + image.path"
      class="z-10 max-w-full xl:max-w-screen-xl shadow-2xl"
    />
  </div>
  <router-view v-on:update="get" />
</template>

<script>
import api from '../api'

export default {
  emits: ['fetch'],
  data() {
    return {
      car: {},
      role: localStorage.getItem('role'),
      image: {
        // domain: 'http://localhost:1337',
        domain: 'https://arras-utilitaires.herokuapp.com',
        path: false
      }
    }
  },
  methods: {
    spaceNumber(x) {
      let parts = x.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return parts.join('.')
    },
    save() {
      this.car.service = this.car.service.split('/').reverse().join('-')
      api.put(`/cars/${ this.car.id }`, this.car).then(() => {
        this.$emit('fetch')
        this.$router.push('/cars')
      })
    },
    erase() {
      api.delete(`/cars/${ this.car.id }`).then(() => {
        this.$emit('fetch')
        this.$router.push('/cars')
      })
    },
    setFile() {
      document.getElementById('upload').click()
    },
    addFile(id) {
      console.log('AddFile', id)
    },
    get() {
      this.car = JSON.parse(localStorage.getItem('cars')).find(car => car.id == this.$route.params.id) || []
      if (this.car) this.car.service = this.car.service.split('-').reverse().join('/')
    }
  },
  mounted() {
    this.get()
  }
}
</script>