import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import persistState from 'redux-localstorage'

import { initialState } from './state'
import './index.css'
import Metronome from './Metronome'
import { rootReducer } from './reducers'

const loggerMiddleware = createLogger({
  duration: true,
  timestamp: false,
  collapsed: true,
  predicate: (getState, action) => (
    action.type !== 'NOOP'
  )
})

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(loggerMiddleware),
    persistState(),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Metronome />
  </Provider>,
  document.getElementById('root'))

window.store = store
window.dispatch = store.dispatch
window.audioCtx = new AudioContext()
