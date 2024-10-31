import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good+1)}
  const handleNeutralClick = () => {setNeutral(neutral+1)}
  const handleBadClick = () => {setBad(bad+1)}
  const total = (good+neutral+bad)
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
      all={total}
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

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    );
  }

  return (
    <div>
       <h1>statistics</h1>

       <StatisticLine text={'good'} value={props.good}/>
       <StatisticLine text={'neutral'} value={props.neutral}/>
       <StatisticLine text={'bad'} value={props.bad}/>
       <StatisticLine text={'all'} value={props.total}/>
       <StatisticLine text={'average'} value={props.average}/>
       <StatisticLine text={'positive'} value={props.positive+'%'}/>

    </div>
  )
}

const StatisticLine = ({text, value}) => {

  return(
  <p>{text} {value}</p>
  )
}

export default App