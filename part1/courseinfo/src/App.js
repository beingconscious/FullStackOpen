  import React from 'react'
const Header = (props) => {
  return(
    <h1>{props.course}</h1>
    )
}

const Total = (props) => {
  let total =0 
  props.parts.forEach(value => total += value.exercises)
  return(
      <p>{total}</p>
    )
}

const Content = (props) => {
  const parts = props.parts
  return(
    <div>
      <Part parts = {parts[0].name} exercises = {parts[0].exercises} />
      <Part parts = {parts[1].name} exercises = {parts[1].exercises} />
      <Part parts = {parts[2].name} exercises = {parts[2].exercises}  />
    </div>
    )
}

const Part = (props) => {
  return(
      <p>{props.parts} {props.exercises}</p>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course= {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App