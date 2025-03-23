import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'


/* const combinedReducer = combineReducers({
  anecdotes: reducer,
  filter: filterReducer
}) */

/* const store = createStore(combinedReducer)
store.subscribe(() => {
  store.getState()
})
 */

/* const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer
  }
}) */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)