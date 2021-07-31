// import axios from 'axios'
const axios = require('axios')

class Api {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com/',
      timeout: 60000,
      headers: { 'X-Custom-Header': 'foobar' }
    })
  }

  get(url, config = null) {
    return this.client.get(url, config)
  }
  post(url, params, config = null) {
    return this.client.post(url, params, config)
  }
  delete(url, config = null) {
    return this.client.delete(url, config)
  }

  patch(url, params) {
    return this.client.put(url, params)
  }
  put(url, params) {
    return this.client.put(url, params)
  }
}
export default Api
