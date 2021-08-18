import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:1337',
  headers: {
    Authorization: `Bearer ${ localStorage.getItem('token') }`
  }
})