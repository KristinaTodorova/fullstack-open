import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      const filter = state.filter
      return state.anecdotes.filter(a =>
        a.content.toLowerCase().includes(filter)
      )
    })

    const dispatch = useDispatch()

    const voteForAnecdote = (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(setNotification(`you voted for ${anecdote.content}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }

    return (<div>
        {[...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>)

}

export default AnecdoteList