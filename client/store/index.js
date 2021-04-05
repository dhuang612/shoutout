import {createStore, combineReducers, applyMiddleware} from 'redux'

import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import emails from './emails'
import shoutouts from './shoutouts'

const reducer = combineReducers({user, emails, shoutouts})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './emails'
export * from './shoutouts'
