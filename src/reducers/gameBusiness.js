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

export  function moveTiles (direction, state) {
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