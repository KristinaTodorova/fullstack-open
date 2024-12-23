import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  var [votes,setVotes] = useState(new Uint8Array(8))
  const [winner,setWinner] = useState(0)

  const generateRandom = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const handleClick = () => {
    setSelected(generateRandom())
  } 

  const handleVote = () => {
    //setVotes(votes[selected]+=1) - Reminder to me: not allowed because it's a direct mutation of the useState value
    setVotes(votes => {
        const updatedVotes = [...votes];
        updatedVotes[selected] += 1;

        let maxIndex = 0;
        for (let i = 1; i < updatedVotes.length; i++) {
            if (updatedVotes[i] > updatedVotes[maxIndex]) {
                maxIndex = i;
            }
        }
        setWinner(maxIndex);
        return updatedVotes;
    });
}

  return (
    <div>

      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>

      <table>
        <tbody>
          <tr>
            <Button text={'vote'} onClick={handleVote}/>
            <Button text={'next anecdote'} onClick={handleClick}/>
      </tr>
      </tbody>
      </table>

      <h1>Anecdote with most votes</h1>
      {anecdotes[winner]}
      <p>has {votes[winner]} votes</p>

    </div>
  )
}

const Button = ({onClick,text}) => {
  return(
  <td>
  <button onClick={onClick}>
    {text}
  </button>
  </td>
  )
}

export default App