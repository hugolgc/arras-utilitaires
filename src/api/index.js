import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_URL,
  // baseURL: 'http://localhost:1337',
  // baseURL: 'https://arras-utilitaires.herokuapp.com',
  headers: {
    Authorization: `Bearer ${ localStorage.getItem('token') }`
  }
})