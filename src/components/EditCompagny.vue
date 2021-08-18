<template>
  <form
    @submit.prevent="save"
    method="post"
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div @click="$router.push('/compagnies')" class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
    <div class="z-10 w-full max-w-screen-md bg-white shadow-2xl">
      <div class="px-8 py-6 overflow-scroll" :style="{ maxHeight: '90vh' }">
        <table class="w-full table-auto divide-y">
          <tbody>
            <tr>
              <td class="px-2 py-1.5 text-gray-400">Nom</td>
              <td class="px-2 py-1.5">
                <input
                  v-model="compagny.name"
                  type="text" maxlength="255" required
                  placeholder="Saisir un nom"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1.5 text-gray-400">Adresse</td>
              <td class="px-2 py-1.5">
                <input
                  v-model="compagny.adress"
                  type="text" maxlength="255"
                  placeholder="Saisir une adresse"
                  class="w-full focus:outline-none"
                />
              </td>
            </tr>
            <tr>
              <td class="px-2 py-1.5 flex text-gray-400">Véhicules</td>
              <td class="px-2 py-1.5 font-semibold">
                <router-link
                  v-for="car in compagny.cars"
                  :key="car.id"
                  :to="{ path: `/cars/edit/${ car.id }` }"
                  class="block"
                >{{ car.model }}</router-link>
              </td>
            </tr>
          </tbody>
        </table>
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
</template>

<script>
import api from '../api'

export default {
  emits: ['fetch'],
  data() {
    return {
      compagny: {},
      role: localStorage.getItem('role')
    }
  },
  methods: {
    save() {
      api.put(`/compagnies/${ this.compagny.id }`, this.compagny).then(() => {
        this.$emit('fetch')
        this.$router.push('/compagnies')
      })
    },
    erase() {
      api.delete(`/compagnies/${ this.compagny.id }`).then((res) => {
        this.$emit('fetch')
        this.$router.push('/compagnies')
      })
    }
  },
  mounted() {
    this.compagny = JSON.parse(localStorage.getItem('compagnies')).find(compagny => compagny.id == this.$route.params.id) || []
  }
}
</script>