import axios from 'axios'
import * as utils from './utils';

const apiUrl = `${utils.domain}/api/`

const handleErrors = err => {
  throw err
}

const responseData = res => res

const requests = {
  get: (url) => axios({ url: `${apiUrl}${url}`, method: 'get' })
    .then(responseData)
    .catch(handleErrors),
  post: (url, data, headers={}) => axios({
    url: `${apiUrl}${url}`, method: 'post', data, headers
  }).then(responseData)
    .catch(handleErrors),
  put: (url, data) => axios.put(`${apiUrl}${url}`, data, { headers: { 'Content-Type': 'application/json' } })
    .then(responseData)
    .catch(handleErrors),
  patch: (url, data) => axios.patch(`${apiUrl}${url}`, data)
    .then(responseData)
    .catch(handleErrors),
  del: (url) => axios.delete(`${apiUrl}${url}`)
    .then(responseData)
    .catch(handleErrors),
}

export const ApiManager = {
  saveUser: (data) => requests.post('users', data),
  updateUser: (userId, data) => requests.put(`users/${userId}`, data),
  getUser: (userId) => requests.get(`users/${userId}`),
  deleteUser: (userId) => requests.del(`users/${userId}`, {}),
  getUsersList: (options) => requests.get(`users/list?limit=${options.limit}&skip=${options.skip}`),
  login: (data) => requests.post('users/login', data),
}

export default ApiManager
