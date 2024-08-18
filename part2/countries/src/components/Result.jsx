function Result({ result, setFullResult }) {
  return (
    <li>
      {result} {' '}
      <button onClick={() => setFullResult(result)}>Show</button>
    </li>
  )
}

export default Result
