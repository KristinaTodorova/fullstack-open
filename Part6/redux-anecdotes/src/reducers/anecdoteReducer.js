import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteVote = state.find(anecdote => anecdote.id === id)
      const addVote = { 
        ...anecdoteVote, 
        votes: anecdoteVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : addVote 
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer