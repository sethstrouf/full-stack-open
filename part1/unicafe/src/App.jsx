import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad, allCounts }) => {
  if (allCounts === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No Feedback Given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {allCounts}</p>
      <p>Average {(good + -bad) / allCounts}</p>
      <p>Positive {good / allCounts * 100} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allCounts, setAllCounts] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
    setAllCounts(allCounts + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setAllCounts(allCounts + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
    setAllCounts(allCounts + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodFeedback} text="Good" />
      <Button handleClick={handleNeutralFeedback} text="Neutral" />
      <Button handleClick={handleBadFeedback} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} allCounts={allCounts} />
    </div>
  )
}

export default App