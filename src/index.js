import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './index.css'
import Metronome from './Metronome'
import { rootReducer } from './reducers'

const store = createStore(rootReducer, {on: true})

ReactDOM.render(
  <Provider store={store}>
    <Metronome />
  </Provider>,
  document.getElementById('root'))

window.store = store
window.dispatch = store.dispatch
