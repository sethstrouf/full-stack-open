import { useState } from "react"
import ShowCountry from "./ShowCountry"
import Result from "./Result"

function Results({ results }) {
  const [fullResult, setFullResult] = useState('')
  let displayedResults = ''

  if (fullResult && results.length > 1) {
    displayedResults = (
      <div>
        {results.map(result => <Result key={result} result={result} setFullResult={setFullResult} />)}
        <ShowCountry country={fullResult} />
      </div>
    )
  } else if (results.length > 10) {
    displayedResults = 'Too many matches, specify another filter'
  } else if (results.length === 1) {
    displayedResults = <ShowCountry country={results[0]} />
  } else if (results.length === 0) {
    displayedResults = ''
  } else {
    displayedResults = results.map(result => <Result key={result} result={result} setFullResult={setFullResult} />)
  }

  return (
    <>
      <ul>
        {displayedResults}
      </ul>
    </>
  )
}

export default Results
