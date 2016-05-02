/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

 import { MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN } from './../actions/const';


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

let moveLine = (direction, line) => {
  let edge = ~['DOWN','RIGHT'].indexOf(direction) ? 3 : 0
  let sortByX = (a, b) => b.x - a.x
  let sortByY = (a, b) => b.y - a.y

  let moveEachRight = (tile, index) => Object.assign(tile, {x: edge-index}) 
  let moveEachLeft  = (tile, index) => Object.assign(tile, {x: index}) 
  let moveEachDown  = (tile, index) => Object.assign(tile, {y: edge-index}) 
  let moveEachUp    = (tile, index) => Object.assign(tile, {y: index}) 

  let hasNotBeenMerged = tile => tile.val != 0
  let mergeIfPossible = (tile, index, tiles) => {
    let next = tiles[index+1]
    if (next && tile.val === next.val) {
      next.val = 0
      return Object.assign(tile, {x: tile.x, y:tile.y, val: tile.val*2})
    }
    return tile
  }

  if (direction === 'RIGHT') {
    return line
            .sort(sortByX)
            .map(moveEachRight)
            .map(mergeIfPossible)
            .filter(hasNotBeenMerged)
            .map(moveEachRight)
  }

  if (direction === 'LEFT') {
    return line
            .sort(sortByX)
            .reverse()
            .map(moveEachLeft)
            .map(mergeIfPossible)
            .filter(hasNotBeenMerged)
            .map(moveEachLeft)
  }

  if (direction === 'DOWN') {
    return line
            .sort(sortByY)
            .map(moveEachDown)
            .map(mergeIfPossible)
            .filter(hasNotBeenMerged)
            .map(moveEachDown)
  }

  if (direction === 'UP') {
    return line
            .sort(sortByY)
            .reverse()
            .map(moveEachUp)
            .map(mergeIfPossible)
            .filter(hasNotBeenMerged)
            .map(moveEachUp)
  }
}

let moveTiles = (direction, state) => {
  let tiles = state.tiles
  let getLine = index => {
    if (~['LEFT','RIGHT'].indexOf(direction)) {
      return tiles.filter(tile => tile.y===index)
    }
    return tiles.filter(tile => tile.x===index)
  }
  return {
    tiles: [
      ...moveLine(direction, getLine(0)),
      ...moveLine(direction, getLine(1)),
      ...moveLine(direction, getLine(2)),
      ...moveLine(direction, getLine(3))
    ]
  }
}

module.exports = function(state = initialState, action) {
  switch(action.type) {

    case MOVE_RIGHT:
      return Object.assign({},state, moveTiles('RIGHT', state))
    case MOVE_LEFT:
      return Object.assign({},state, moveTiles('LEFT', state))
    case MOVE_UP:
      return Object.assign({},state, moveTiles('UP', state))
    case MOVE_DOWN:
      return Object.assign({},state, moveTiles('DOWN', state))

    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}
