import axios from 'axios'

export default axios.create({
  // baseURL: 'http://localhost:1337',
  baseURL: 'https://arras-utilitaires.herokuapp.com',
  headers: {
    Authorization: `Bearer ${ localStorage.getItem('token') }`
  }
})