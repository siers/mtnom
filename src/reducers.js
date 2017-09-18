import _ from 'lodash'
import fp from 'lodash/fp'
import { handleActions, concat } from 'redux-fp'

const tableUpdater = handleActions({
  ADD_ROW: () => fp.update('table', table => table.concat([['.']])),

  ADD_BEAT: ({ payload: { x } }) =>
    fp.update(`table.${ x }`, row =>
      row.concat(['.'])),

  REMOVE_BEAT: ({ payload: { x, y } }) =>
    fp.pipe(
      fp.unset(`table.${ x }.${ y }`),
      fp.update(`table.${ x }`, fp.compact),
      fp.update(`table`, fp.filter(row => row.length !== 0)),
    ),

  TOGGLE_BEAT: ({ payload: { x, y } }) =>
    fp.update(`table.[${x}][${y}]`,
      elem => _.difference(['#', '.'], [elem])[0]
    ),
})

const rootReducer = (state, action) => concat(
  tableUpdater
)(action)(state)

export {
  rootReducer
}
