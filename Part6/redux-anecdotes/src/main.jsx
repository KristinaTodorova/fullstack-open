import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { combineReducers } from 'redux'

const combinedReducer = combineReducers({
  anecdotes: reducer,
  filter: filterReducer
})

const store = createStore(combinedReducer)
store.subscribe(() => {
  store.getState()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)