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
  ],
  score:0
}

let moveLine = (direction, line) => {
  let edge = ~['DOWN','RIGHT'].indexOf(direction) ? 3 : 0
  let sortByX    = (a, b) => b.x - a.x
  let sortByXrev = (a, b) => a.x - b.x
  let sortByY    = (a, b) => b.y - a.y
  let sortByYrev = (a, b) => a.y - b.y

  let moveEachRight = (tile, index) => Object.assign(tile, {x: edge-index}) 
  let moveEachLeft  = (tile, index) => Object.assign(tile, {x: index}) 
  let moveEachDown  = (tile, index) => Object.assign(tile, {y: edge-index}) 
  let moveEachUp    = (tile, index) => Object.assign(tile, {y: index}) 

  let hasNotBeenMerged = tile => tile.val > 0
  let hasBeenMerged = tile => tile.val < 0

  let mergeIfPossible = (tile, index, tiles) => {
    let next = tiles[index+1]
    if (next && tile.val === next.val) {
      next.val = -next.val
      return Object.assign(tile, {x: tile.x, y:tile.y, val: tile.val*2})
    }
    return tile
  }

  let evalauteScore = (score, tile) => score + tile.val


  let sortByDirection
  let moveEachByDirection

  if (direction === 'RIGHT') {
    sortByDirection = sortByX
    moveEachByDirection = moveEachRight
  }

  if (direction === 'LEFT') {
    sortByDirection = sortByXrev
    moveEachByDirection = moveEachLeft
  }

  if (direction === 'DOWN') {
    sortByDirection = sortByY
    moveEachByDirection = moveEachDown
  }

  if (direction === 'UP') {
    sortByDirection = sortByYrev
    moveEachByDirection = moveEachUp
  }

  //Move and merge
  let moves = line
                .sort(sortByDirection)
                .map(moveEachByDirection)
                .map(mergeIfPossible)

  //Remove merged and fill the holes
  let fullMove = moves
                .filter(hasNotBeenMerged)
                .map(moveEachByDirection)

  let mergedScore = moves
                .filter(hasBeenMerged)
                .reduce(evalauteScore, 0)

  return {
    tiles: fullMove,
    score: Math.abs(mergedScore * 2)
  }
}

let moveTiles = (direction, state) => {
  let tiles = state.tiles
  let lines = [0,1,2,3]
  let getLine = index => {
    if (~['LEFT','RIGHT'].indexOf(direction)) {
      return tiles.filter(tile => tile.y===index)
    }
    return tiles.filter(tile => tile.x===index)
  }
  
  return lines.reduce((ret, line) => { 
    let move = moveLine(direction, getLine(line))
    ret.tiles.push(...move.tiles)
    ret.score += move.score
    return ret
  }, {tiles:[], score:state.score})
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
