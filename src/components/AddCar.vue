<template>
  <form
    @submit.prevent="save"
    method="post"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="$router.push('/cars')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white shadow-2xl">
      <div class="px-2 py-4 md:px-8 md:py-6 overflow-scroll" :style="{ maxHeight: '70vh' }">
        <table class="w-full table-auto divide-y">
          <tbody>
            <tr>
              <td class="px-2 py-1 text-gray-400">Modèle</td>
              <td class="px-2 py-1">
                <input
                  v-model="model"
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
                  v-model="serie"
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
                  v-model="service"
                  type="text" required
                  placeholder="jj/mm/aaaa"
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Roulage annuel</td>
              <td class="px-2 py-1">
                <input
                  v-model="rolling"
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
                  v-model="motor"
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
                  v-model="brakes"
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
                  v-model="fuel"
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
                  v-model="oil"
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
                  v-model="air"
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
                  v-model="lodge"
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
                  v-model="observation"
                  type="text" maxlength="3000" rows="3"
                  placeholder="Saisir une observation"
                  class="w-full focus:outline-none"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="block w-full p-3 border-t text-gray-400 focus:outline-none">Ajouter</button>
    </div>
  </form>
</template>

<script>
import api from '../api'

export default {
  emits: ['fetch'],
  data() {
    return {
      model: '',
      serie: '',
      service: '',
      rolling: '',
      observation: '',
      motor: '',
      brakes: '',
      fuel: '',
      oil: '',
      air: '',
      lodge: ''
    }
  },
  methods: {
    save() {
      this.service = this.service.split('/').reverse().join('-')
      api.post('/cars', this.$data).then(() => {
        this.$emit('fetch')
        this.$router.push('/cars')
      })
    }
  }
}
</script>