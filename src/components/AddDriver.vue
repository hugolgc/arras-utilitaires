<template>
  <form
    @submit.prevent="save"
    method="post"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="$router.push('/drivers')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white shadow-2xl">
      <div class="px-2 py-4 md:px-8 md:py-6 overflow-auto" :style="{ maxHeight: '70vh' }">
        <table class="w-full table-auto divide-y">
          <tbody>
            <tr>
              <td class="px-2 py-1 text-gray-400">Nom</td>
              <td class="px-2 py-1">
                <input
                  v-model="name"
                  type="text" maxlength="255" required
                  placeholder="Saisir un nom"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Téléphone</td>
              <td class="px-2 py-1">
                <input
                  v-model="phone"
                  type="text" maxlength="14"
                  placeholder="Saisir un numéro"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Email</td>
              <td class="px-2 py-1">
                <input
                  v-model="email"
                  type="email" maxlength="255"
                  placeholder="Saisir un email"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1 text-gray-400">Adresse</td>
              <td class="px-2 py-1">
                <input
                  v-model="adress"
                  type="text" maxlength="255"
                  placeholder="Saisir une adresse"
                  class="w-full focus:outline-none"
                />
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
      name: '',
      phone: '',
      email: '',
      adress: ''
    }
  },
  methods: {
    save() {
      api.post('/drivers', this.$data).then(() => {
        this.$emit('fetch')
        this.$router.push('/drivers')
      })
    }
  }
}
</script>