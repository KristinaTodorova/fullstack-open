const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'FILTER_ANECDOTES':
        return action.payload
      default:
        return state
    }
  }
  
export const setFilter = (value) => {
    return {
      type: 'FILTER_ANECDOTES',
      payload: value
    }
  }
  
export default filterReducer