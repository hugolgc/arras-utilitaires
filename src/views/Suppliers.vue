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
            placeholder="Chercher un fournisseur"
            maxlength="255"
            class="w-full text-gray-400 focus:outline-none"
          />
        </div>
        <button @click="$router.push('/drivers/add')" class="block px-2 py-1 bg-gray-50 border-gray-200 border rounded text-gray-400 text-sm focus:outline-none">Ajouter</button>
      </div>
      <div class="overflow-auto">
        <table :style="{ minWidth: '600px' }" class="w-full table-auto divide-y border-t border-b">
          <thead class="text-left text-gray-400">
            <tr class="divide-x">
              <th class="px-2 py-1 font-normal">Fournisseurs</th>
              <th class="px-2 py-1 font-normal">Total</th>
              <th class="px-2 py-1 font-normal">Pièces</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="supplier in search"
              :key="supplier.id"
              class="divide-x hover:bg-gray-100 duration-200"
            >
              <!-- <td @click="$router.push(`/drivers/edit/${ driver.id }`)" class="px-2 py-1 font-semibold cursor-pointer">{{ driver.name }}</td> -->
              <td class="px-2 py-1 font-semibold select-all">{{ supplier.name }}</td>
              <td class="px-2 py-1 select-all">{{ totalPrice(supplier) }}€</td>
              <td class="px-2 py-1 select-all">
                <p
                  v-for="part in supplier.parts"
                  :key="part.id"
                >
                  <span>{{ part.part_type.name }}</span> <span class="text-gray-400">{{ part.amount }}</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      input: '',
      parts: [],
      suppliers: []
    }
  },
  methods: {
    get() {
      api.get('/parts').then(res => { this.parts = res.data }).then(() => {
        this.parts.forEach(part => {
          if (!this.suppliers.find(supplier => supplier.name.toLowerCase() === part.customer.toLowerCase())) this.suppliers.push({ name: part.customer, parts: [] })
          this.suppliers.find(supplier => supplier.name.toLowerCase() === part.customer.toLowerCase()).parts.push(part)
        })
      })
    },
    totalPrice(supplier) {
      let price = 0
      supplier.parts.forEach(part => { price = price + (part.amount * part.customerPrice) })
      console.log(supplier)
      return price
    }
  },
  computed: {
    search() {
      return this.suppliers.filter(supplier => {
        return supplier.name.toLowerCase().includes(this.input.toLowerCase())
      }).reverse()
    }
  },
  beforeMount() {
    if (!localStorage.getItem('token')) this.$router.push('/')
  },
  mounted() {
    this.get()
  }
}
</script>