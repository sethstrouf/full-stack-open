import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getOne = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

// const update = person => {
//   const request = axios.put(`${baseUrl}/${person.id}`, person)
//   return request.then(response => response.data)
// }

// const destroy = id => {
//   const request = axios.delete(`${baseUrl}/${id}`)
//   return request.then(response => response.data)
// }

export default { getAll, getOne }