import { useState, useEffect } from "react"
import countriesService from "../services/countriesService"

function ShowCountry({ country }) {
  const [fullCountry, setFullCountry] = useState()

  useEffect(() => {
    countriesService
      .getOne(country)
      .then(returnedCountry => {
        setFullCountry(returnedCountry)
      })
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
        </>
      : 'loading...'
      }
    </div>
  )
}

export default ShowCountry
