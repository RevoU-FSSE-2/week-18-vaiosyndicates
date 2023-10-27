import { combineReducers, createStore } from 'redux'
import profileReducer from './profile'
import loadingReducer from './loading'
import todoReducer from './todo'
import tokenReducer from './token'

const reducer =  combineReducers({
  profileReducer,
  loadingReducer,
  todoReducer,
  tokenReducer
})

const store = createStore(reducer)
export default store
