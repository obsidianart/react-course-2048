/*Game business logic functions*/

let moveLine = (direction, line) => {
  let edge = ~['DOWN','RIGHT'].indexOf(direction) ? 3 : 0
  let sortByX    = (a, b) => b.x - a.x
  let sortByXrev = (a, b) => a.x - b.x
  let sortByY    = (a, b) => b.y - a.y
  let sortByYrev = (a, b) => a.y - b.y

  let moveEachRight = (tile, index) => Object.assign({}, tile, {x: edge-index}) 
  let moveEachLeft  = (tile, index) => Object.assign({}, tile, {x: index}) 
  let moveEachDown  = (tile, index) => Object.assign({}, tile, {y: edge-index}) 
  let moveEachUp    = (tile, index) => Object.assign({}, tile, {y: index}) 

  let hasNotBeenMerged = tile => tile.val > 0
  let hasBeenMerged = tile => tile.val < 0

  let mergeIfPossible = (tile, index, tiles) => {
    let next = tiles[index+1]
    let prev = tiles[index-1]

    if (prev && prev.merged) {
      return Object.assign({}, tile, {val: -tile.val})
    }
    if (next && tile.val === next.val) {
      //TODO: changing this to Object.assign({}, tile
      //TODO: Seems like an antipattern, doesn't allow this reduce to run in parallel
      //TODO: With the current js implementation parallel execution doesn't really matter, but...
      //TODO: Need to study more about this
      return Object.assign(tile, {x: tile.x, y:tile.y, val: tile.val*2, merged:true})
    }
    return tile
  }

  let evalauteScore = (score, tile) => score + tile.val
  let removeMergedFlag = (tile) => Object.assign(tile, {merged: false}) 


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
                .map(removeMergedFlag)
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


let getFreeTiles = tiles => {
  //We did the system to parse double arrays and flatten yet
  //We discuss here if isn't worth it, or better to just type it
  let allTiles = [
   //xy   xy   xy   xy
    '00','01','02','03',
    '10','11','12','13',
    '20','21','22','23',
    '30','31','32','33',
  ]

  let freeTiles ={} 

  //create all tiles as free
  allTiles.forEach(str=> freeTiles[str] = 1)

  //removing 
  tiles.forEach(tile=> delete freeTiles[`${tile.x}${tile.y}`])

  //converting to the tile object
  return Object.keys(freeTiles).map(str=>({x:parseInt(str[0]), y:parseInt(str[1])}))
}

function getNewTile (state) {
  let freeTiles = getFreeTiles(state.tiles)
  console.log(freeTiles)
  if (freeTiles.length == 0) return false

  let selectedTile = freeTiles[0]

  return {
    val:2,
    x:selectedTile.x,
    y:selectedTile.y,
    id:Math.floor(Math.random()*10000000)
  }
}

function moveTiles (direction, state) {
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

export function moveTileAndAddNew (direction, state) {
  let newState = moveTiles (direction, state)
  let newTile = getNewTile(newState)
  console.log(newTile)
  if (newTile) {
    newState.tiles.push(newTile)
  } else {
    newState.gameOver = true
  }
  return newState
}