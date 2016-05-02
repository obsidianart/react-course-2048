/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import { MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN } from './../actions/const';
import { moveTileAndAddNew } from './gameBusiness'

const initialState = {
  tiles: [
    {x:1, y:0, val:2, id:1, new:false, merged:false}
  ],
  board: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ],
  score:0,
  gameOver:false
}

module.exports = function(state = initialState, action) {
  switch(action.type) {

    case MOVE_RIGHT:
      return Object.assign({}, state, moveTileAndAddNew('RIGHT', state))
    case MOVE_LEFT:
      return Object.assign({}, state, moveTileAndAddNew('LEFT', state))
    case MOVE_UP:
      return Object.assign({}, state, moveTileAndAddNew('UP', state))
    case MOVE_DOWN:
      return Object.assign({}, state, moveTileAndAddNew('DOWN', state))

    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}
