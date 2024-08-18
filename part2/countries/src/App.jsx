import { useState, useEffect } from "react"
import countriesService from "./services/countriesService"
import Filter from "./components/Filter"
import Results from "./components/Results"

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [allCountries, setAllCountries] = useState()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (!allCountries) {
      countriesService
      .getAll()
      .then(countries => {
        const countryNames = countries.map(country => country.name.common)
        setAllCountries(countryNames)
      })
    }

    filterCountries()
  }, [searchTerm])

  const filterCountries = (e) => {
    if (searchTerm) {
      const results = allCountries.filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div>
      {!allCountries
        ? 'loading...'
        :
          <>
            <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Results results={searchResults} />
          </>
      }
    </div>
  )
}

export default App
