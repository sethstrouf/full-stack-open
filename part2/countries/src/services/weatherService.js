import axios from 'axios'

const getOne = (city) => {
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
  return request.then(response => {
    const lat = response.data[0].lat
    const lon = response.data[0].lon
    const weatherRequest = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
    return weatherRequest.then(response => response.data.current)
  })
}

export default { getOne }