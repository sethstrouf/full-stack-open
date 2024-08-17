import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
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
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={allCounts} />
          <StatisticsLine text="Average" value={(good + -bad) / allCounts} />
          <StatisticsLine text="Positive" value={good / allCounts * 100} />
        </tbody>
      </table>
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