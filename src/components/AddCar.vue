<template>
  <form
    @submit.prevent="save"
    method="post"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="$router.push('/cars')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white dark:bg-gray-900 shadow-2xl">
      <div class="px-2 py-4 md:px-8 md:py-6 overflow-auto" :style="{ maxHeight: '70vh' }">
        <table class="w-full table-auto divide-y dark:divide-gray-700">
          <tbody>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Marque</td>
              <td class="px-2 py-1">
                <input
                  v-model="brand"
                  type="text" maxlength="255" required
                  placeholder="Saisir une marque"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Modèle</td>
              <td class="px-2 py-1">
                <input
                  v-model="model"
                  type="text" maxlength="255" required
                  placeholder="Saisir un modèle"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Numéro de série</td>
              <td class="px-2 py-1">
                <input
                  v-model="serie"
                  type="text" maxlength="255" required
                  placeholder="Saisir un numéro"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Mise en service</td>
              <td class="px-2 py-1">
                <input
                  v-model="service"
                  type="text" required
                  placeholder="jj/mm/aaaa"
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Immatriculation</td>
              <td class="px-2 py-1">
                <input
                  v-model="numberplate"
                  type="text" maxlength="255" required
                  placeholder="Saisir un numéro"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Motorisation</td>
              <td class="px-2 py-1">
                <input
                  v-model="motor"
                  type="text" maxlength="255"
                  placeholder="Saisir une motorisation"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Plaquettes de frein</td>
              <td class="px-2 py-1">
                <input
                  v-model="brakes"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Filtre à carburant</td>
              <td class="px-2 py-1">
                <input
                  v-model="fuel"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Filtre à huile</td>
              <td class="px-2 py-1">
                <input
                  v-model="oil"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Filtre à air</td>
              <td class="px-2 py-1">
                <input
                  v-model="air"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Filtre à habitacle</td>
              <td class="px-2 py-1">
                <input
                  v-model="lodge"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Plaquettes de freins AV et AR</td>
              <td class="px-2 py-1">
                <input
                  v-model="brakePads"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400 dark:text-gray-500">Disques de frein AV et AR</td>
              <td class="px-2 py-1">
                <input
                  v-model="brakeDiscs"
                  type="text" maxlength="255"
                  placeholder="Saisir une référence"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 flex text-gray-400 dark:text-gray-500">Observation</td>
              <td class="px-2 py-1">
                <textarea
                  v-model="observation"
                  type="text" maxlength="3000" rows="3"
                  placeholder="Saisir une observation"
                  class="w-full focus:outline-none bg-transparent dark:placeholder-gray-500 dark:text-white"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="block w-full p-3 border-t dark:border-gray-700 text-gray-400 dark:text-gray-500 focus:outline-none">Ajouter</button>
    </div>
  </form>
</template>

<script>
import api from '../api'

export default {
  emits: ['fetch'],
  data() {
    return {
      brand: '',
      model: '',
      serie: '',
      numberplate: '',
      service: '',
      observation: '',
      motor: '',
      brakes: '',
      fuel: '',
      oil: '',
      air: '',
      lodge: '',
      brakePads: '',
      brakeDiscs: ''
    }
  },
  methods: {
    save() {
      this.service = this.service.split('/').reverse().join('-')
      api.post('/cars', this.$data).then(() => {
        this.$emit('fetch')
        this.$router.push(this.$route.params.id ? `/compagnies/edit/${ this.$route.params.id }` : '/cars')
      })
    }
  },
  mounted() {
    if (this.$route.params.id) this.$data.compagny = this.$route.params.id
  }
}
</script>