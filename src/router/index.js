import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cars from '../views/Cars.vue'
import AddCar from '../components/AddCar.vue'
import EditCar from '../components/EditCar.vue'
import EditCarCompagny from '../components/EditCarCompagny.vue'
import EditCarDriver from '../components/EditCarDriver.vue'
import EditCarMileages from '../components/EditCarMileages.vue'
import EditCarMaintenances from '../components/EditCarMaintenances.vue'
import Compagnies from '../views/Compagnies.vue'
import AddCompagny from '../components/AddCompagny.vue'
import EditCompagny from '../components/EditCompagny.vue'
import Drivers from '../views/Drivers.vue'
import AddDriver from '../components/AddDriver.vue'
import EditDriver from '../components/EditDriver.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/cars',
    component: Cars,
    children: [
      {
        path: 'add',
        component: AddCar,
        alias: 'add/:id'
      },
      {
        path: 'edit/:id',
        component: EditCar,
        children: [
          {
            path: 'mileages',
            component: EditCarMileages
          },
          {
            path: 'maintenances/:maintenance',
            component: EditCarMaintenances
          }
        ]
      },
      {
        path: 'compagny/:id',
        component: EditCarCompagny
      },
      {
        path: 'driver/:id',
        component: EditCarDriver
      }
    ]
  },
  {
    path: '/compagnies',
    component: Compagnies,
    children: [
      {
        path: 'add',
        component: AddCompagny
      },
      {
        path: 'edit/:id',
        component: EditCompagny
      }
    ]
  },
  {
    path: '/drivers',
    component: Drivers,
    children: [
      {
        path: 'add',
        component: AddDriver
      },
      {
        path: 'edit/:id',
        component: EditDriver
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
