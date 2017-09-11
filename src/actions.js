import { createAction } from 'redux-actions'

const addRow = createAction('ADD_ROW')
const toggleBeat = createAction('TOGGLE_BEAT')

export {
  addRow,
  toggleBeat,
}
