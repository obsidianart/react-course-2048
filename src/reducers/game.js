/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import { MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN } from './../actions/const';
import { moveTiles } from './gameBusiness'

const initialState = {
  tiles: [
    {x:1, y:0, val:2, id:1},
    {x:0, y:0, val:4, id:2},

    {x:0, y:1, val:2, id:3},
    {x:2, y:1, val:2, id:4},

    {x:0, y:2, val:2, id:5},
    {x:2, y:2, val:2, id:6},
    {x:3, y:2, val:2, id:7},

    {x:0, y:3, val:2, id:10},
    {x:1, y:3, val:2, id:11},
    {x:2, y:3, val:2, id:12},
    {x:3, y:3, val:2, id:13}
  ],
  board: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ],
  score:0
}

module.exports = function(state = initialState, action) {
  switch(action.type) {

    case MOVE_RIGHT:
      return Object.assign({}, state, moveTiles('RIGHT', state))
    case MOVE_LEFT:
      return Object.assign({}, state, moveTiles('LEFT', state))
    case MOVE_UP:
      return Object.assign({}, state, moveTiles('UP', state))
    case MOVE_DOWN:
      return Object.assign({}, state, moveTiles('DOWN', state))

    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}
