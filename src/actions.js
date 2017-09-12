import { createAction } from 'redux-actions'

const addRow = createAction('ADD_ROW')
const addBeat = createAction('ADD_BEAT')
const toggleBeat = createAction('TOGGLE_BEAT')

export {
  addRow,
  addBeat,
  toggleBeat,
}
