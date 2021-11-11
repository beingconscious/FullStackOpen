import React ,{useState} from 'react'

const Button = (props) => {
  return(
    <button onClick= {props.handler} >{props.text}</button>
  )
}

const Statistic = ({text,value}) => {
  return(
    <>
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ( {good,neutral,bad} ) => {
  let total = good + bad +neutral
  let avg =0 , positive = 0
  avg = (avg + good - bad ) / total
  positive = good / total * 100

  if (total === 0) {
    return(
      <p>
        No feedback given
      </p>
      )
  }
  return(
    <>
      <table>
        <tbody>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="all" value ={total} />
          <Statistic text="average" value ={avg} />
          <Statistic text="positive" value ={positive + "%" } />
        </tbody>
      </table>
    < />
  )
}

const App = () => {
// save clicks of each button to its own state
const [ good , setGood ] = useState ( 0 )
const [ neutral , setNeutral ] = useState ( 0 )
const [ bad , setBad ] = useState ( 0 )

const handleGood = () => setGood(good + 1)
const handleBad = () => setBad(bad + 1)
const handleNeutral = () => setNeutral(neutral + 1)

  return (
    <>
      <h2>give feedback</h2>
      <br />
      <Button handler = { handleGood } text = "good" />
      <Button handler = { handleNeutral } text = "neutral" />
      <Button handler = { handleBad } text = "bad" /> 
      <br />
      <h2>statistics</h2>
      <Statistics good= {good} neutral = {neutral} bad ={bad} />
    </ >
  )
}
export default App