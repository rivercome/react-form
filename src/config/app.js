export default {
  axiosOptions (config) {
    // config can send from 'utils/request'
    // in the example, token is a bool type to tell is need request with token
    // more options please see 'https://github.com/axios/axios'
    return {
      timeout: 30000,
      header: config.token ? {'token': 'someway to get token'} : {},
      baseURL: ''  // set request base url
    }
  }
}
