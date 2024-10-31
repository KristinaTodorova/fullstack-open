import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good+1)}
  const handleNeutralClick = () => {setNeutral(neutral+1)}
  const handleBadClick = () => {setBad(bad+1)}
  const average = () => (good-bad)/(good+neutral+bad) || 0;
  const positive = () => (good/(good+neutral+bad)*100) || 0;

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>

      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      all={good+bad+neutral}
      average={average()}
      positive={positive()}
      />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  return (
    <div>
       <h1>statistics</h1>

      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good+props.neutral+props.bad}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}%</p>
    </div>
  )
}

export default App