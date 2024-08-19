import { useState, useEffect } from "react"
import countriesService from "../services/countriesService"
import weatherService from "../services/weatherService"

function ShowCountry({ country }) {
  const [fullCountry, setFullCountry] = useState()
  const [weather, setWeather] = useState()

  useEffect(() => {
    if (country) {
      countriesService
        .getOne(country)
        .then(returnedCountry => {
          setFullCountry(returnedCountry)

          weatherService
            .getOne(returnedCountry.capital[0])
            .then(returnedWeather => {
              setWeather(returnedWeather)
          })
        })
    }
  }, [country])

  return (
    <div>
      {fullCountry
      ?
        <>
          <h1>{country}</h1>
          <p>Capital: {fullCountry.capital}</p>
          <p>Area: {fullCountry.area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.values(fullCountry.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <br />
          <img src={fullCountry.flags.png} alt={fullCountry.flags.alt} />

          {weather &&
            <>
              <h2>Weather in {fullCountry.capital[0]}</h2>
              <p>Temperature: {weather.temp} F</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <p>Wind: {weather.wind_speed} mph</p>
            </>
          }
        </>
      : 'loading...'
      }
    </div>
  )
}

export default ShowCountry
