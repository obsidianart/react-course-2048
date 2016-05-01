/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
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
  ]
}

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state)

  switch(action.type) {
    /*
    case 'YOUR_ACTION': {
      // Modify next state depending on the action and return it
      return nextState
    } break
    */
    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}
