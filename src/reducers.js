import _ from 'lodash'
import fp from 'lodash/fp'
import { handleActions, concat } from 'redux-fp'

const tableUpdater = handleActions({
  ADD_ROW: () => fp.update('table', table => table.concat([['.']])),

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
