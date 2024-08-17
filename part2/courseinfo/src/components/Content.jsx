import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  const sumOfExercises = () => {
    return parts.reduce((acc, curr) => acc + curr.exercises, 0)
  }

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
      <strong>Total of {sumOfExercises()} exercises</strong>
    </div>
  )
}

export default Content