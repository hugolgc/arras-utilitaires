<template>
  <form
    @submit.prevent="save"
    method="post"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="$router.push('/drivers')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white dark:bg-gray-900 shadow-2xl">
      <div class="px-2 py-4 md:px-8 md:py-6 overflow-auto" :style="{ maxHeight: '70vh' }">
        <table class="w-full table-auto divide-y dark:divide-gray-700">
          <tbody>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Nom</td>
              <td class="px-2 py-1">
                <input
                  v-model="driver.name"
                  type="text" maxlength="255" required
                  placeholder="Saisir un nom"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Téléphone</td>
              <td class="px-2 py-1">
                <input
                  v-model="driver.phone"
                  type="text" maxlength="14"
                  placeholder="Saisir un numéro"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Email</td>
              <td class="px-2 py-1">
                <input
                  v-model="driver.email"
                  type="email" maxlength="255"
                  placeholder="Saisir un email"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Adresse</td>
              <td class="px-2 py-1">
                <input
                  v-model="driver.adress"
                  type="text" maxlength="255"
                  placeholder="Saisir une adresse"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 flex text-gray-400 dark:text-gray-500">Véhicules</td>
              <td class="px-2 py-1 font-semibold">
                <router-link
                  v-for="car in driver.cars"
                  :key="car.id"
                  :to="{ path: `/cars/edit/${ car.id }` }"
                  class="block"
                >{{ car.brand }} {{ car.model }}</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex divide-x dark:divide-gray-700">
        <div @click="download" class="flex-1 block p-3 border-t dark:border-gray-700 text-gray-400 dark:text-gray-500 text-center cursor-pointer">Télécharger</div>
        <button class="flex-1 block p-3 border-t dark:border-gray-700 text-gray-400 dark:text-gray-500 focus:outline-none">Enregistrer</button>
        <div
          v-if="role === 'super_admin'"
          @click="erase"
          class="flex-1 block p-3 border-t dark:border-gray-700 text-red-400 text-center cursor-pointer"
        >Supprimer</div>
      </div>
    </div>
  </form>
</template>

<script>
import api from '../api'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  emits: ['fetch'],
  data() {
    return {
      driver: {},
      role: localStorage.getItem('role')
    }
  },
  methods: {
    save() {
      api.put(`/drivers/${ this.driver.id }`, this.driver).then(() => {
        this.$emit('fetch')
        this.$router.push('/drivers')
      })
    },
    erase() {
      api.delete(`/drivers/${ this.driver.id }`).then(() => {
        this.$emit('fetch')
        this.$router.push('/drivers')
      })
    },
    download() {
      let body = [['Modèle', 'Numéro de série', 'Mise en service', 'Motorisation']]
      this.driver.cars.forEach(car => body.push([car.model, car.serie, this.setDate(car.service), car.motor]))
      pdfMake.createPdf({
        pageSize: 'A4',
        content: [
          { text: this.driver.name, fontSize: 20, bold: true, },
          { text: this.driver.phone, fontSize: 15 },
          { text: this.driver.email, fontSize: 15 },
          { text: this.driver.adress, fontSize: 15 },
          {
            fontSize: 10,
            margin: [0, 30, 0, 0],
            layout: 'lightHorizontalLines',
            table: { headerRows: 1, widths: [ '*', 'auto', 'auto', '*', '*' ], body: body }
          }
        ]
      }).open()
    },
    setDate(slug) {
      let date = new Date(slug)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  mounted() {
    this.driver = JSON.parse(localStorage.getItem('drivers')).find(driver => driver.id == this.$route.params.id) || []
  }
}
</script>