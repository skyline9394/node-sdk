import axios from 'axios'
import btoa from 'btoa'

class Connection {
  constructor(baseUrl, token = '') {
    this.baseUrl = baseUrl
    this.token = token
  }

  request(path, body = {}) {
    let config = {
      url: `${this.baseUrl}${path}`,
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: body,
      timeout: 1000
    }

    if (this.token) {
      config.headers['Authorization'] = `Basic ${btoa(this.token)}`
    }

    return axios.request(config).then(resp => {
      if (resp.data.status === 'fail') {
        throw resp.data.msg
      } else if (resp.data.status === 'success') {
        return resp.data.data
      }

      return resp.data
    })
  }
}

export default Connection
