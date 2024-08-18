import ShowCountry from "./ShowCountry"

function Results({ results }) {
  let displayedResults = ''

  if (results.length > 10) {
    displayedResults = 'Too many matches, specify another filter'
  } else if (results.length === 1) {
    displayedResults = <ShowCountry country={results[0]} />
  } else if (results.length === 0) {
    displayedResults = ''
  } else {
    displayedResults = results.map(result => <li key={result}>{result}</li>)
  }

  return (
    <ul>
      {displayedResults}
    </ul>
  )
}

export default Results
