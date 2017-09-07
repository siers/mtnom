import fp from 'lodash/fp'
import { handleActions, concat } from 'redux-fp'

const tableUpdater = handleActions({
  ADD_ROW: () => fp.set('x', 'y'),
})

const rootReducer = (state, action) => concat(
  tableUpdater
)(action)(state)

export {
  rootReducer
}
