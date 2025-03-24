import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
      }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={createNewAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
        </form>
        </div>
    )

}

export default AnecdoteForm