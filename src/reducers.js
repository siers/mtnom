import fp from 'lodash/fp'
import { handleActions, concat } from 'redux-fp'

const tableUpdater = handleActions({
  ADD_ROW: () => fp.update('table', table => table.concat([['.']])),
})

const rootReducer = (state, action) => concat(
  tableUpdater
)(action)(state)

export {
  rootReducer
}
