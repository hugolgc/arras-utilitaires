import axios from 'axios'

export default axios.create({
  baseURL: ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'http' : 'https') + process.env.VUE_APP_URL,
  headers: {
    Authorization: `Bearer ${ localStorage.getItem('token') }`
  }
})