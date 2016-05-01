require('normalize.css/normalize.css')
require('styles/App.scss')

import React from 'react'

//let yeomanImage = require('../images/yeoman.png')

const KEY_DIRECTIONS = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN'
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: [
        {x:1, y:0, val:2, id:1},
        {x:0, y:0, val:4, id:2},

        {x:0, y:1, val:2, id:3},
        {x:2, y:1, val:2, id:4},

        {x:0, y:2, val:2, id:5},
        {x:2, y:2, val:2, id:6},
        {x:3, y:2, val:2, id:7},


        {x:2, y:3, val:2, id:10}
      ]
    }
  }

  moveRowRight(row) {
    let edge = 3
    let sortByDirection = (a, b) => b.x - a.x
    let moveToTheFarEdge = (tile, index) => Object.assign(tile, {x: edge-index}) 
    let hasNotBeenMerged = tile => tile.val != 0
    let mergeIfPossible = (newTiles, tile, index, tiles) => {
      let next = tiles[index+1]
      if (next && tile.val === next.val) {
        next.val = 0
        newTiles.push(Object.assign(tile, {x: tile.x, val: tile.val*2}))
      } else {
        newTiles.push(tile)
      }
      return newTiles
    }

    return row
            .sort(sortByDirection)
            .map(moveToTheFarEdge)
            .reduce(mergeIfPossible, [])
            .filter(hasNotBeenMerged)
            .map(moveToTheFarEdge)
  }

  moveRowLeft(row) {
    let edge = 0
    let sortByDirection = (a, b) => a.x - b.x
    let moveToTheFarEdge = (tile, index) => Object.assign(tile, {x: index}) 
    let hasNotBeenMerged = tile => tile.val != 0
    let mergeIfPossible = (newTiles, tile, index, tiles) => {
      let next = tiles[index+1]
      if (next && tile.val === next.val) {
        next.val = 0
        newTiles.push(Object.assign(tile, {x: tile.x, val: tile.val*2}))
      } else {
        newTiles.push(tile)
      }
      return newTiles
    }

    return row
            .sort(sortByDirection)
            .map(moveToTheFarEdge)
            .reduce(mergeIfPossible, [])
            .filter(hasNotBeenMerged)
            .map(moveToTheFarEdge)
  }

  moveTilesRight(state) {
    let tiles = state.tiles
    return {
      tiles: [
        ...this.moveRowRight(tiles.filter(tile => tile.y===0)),
        ...this.moveRowRight(tiles.filter(tile => tile.y===1)),
        ...this.moveRowRight(tiles.filter(tile => tile.y===2)),
        ...this.moveRowRight(tiles.filter(tile => tile.y===3))
      ]
    }
  }

  moveTilesLeft(state) {
    let tiles = state.tiles
    return {
      tiles: [
        ...this.moveRowLeft(tiles.filter(tile => tile.y===0)),
        ...this.moveRowLeft(tiles.filter(tile => tile.y===1)),
        ...this.moveRowLeft(tiles.filter(tile => tile.y===2)),
        ...this.moveRowLeft(tiles.filter(tile => tile.y===3))
      ]
    }
  }

  handleKeyDown(event) {
    if (event.keyCode in KEY_DIRECTIONS) {
      event.preventDefault()
      let dir = KEY_DIRECTIONS[event.keyCode]

      dir == 'RIGHT' && this.setState(this.moveTilesRight)
      dir == 'LEFT' && this.setState(this.moveTilesLeft)

      
      //console.log("direction", KEY_DIRECTIONS[event.keyCode])
      //this.setState({board: this.state.board.move(direction)})
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    let board = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]

    return (
      <main>
        <h1>2048</h1>
        <div>{false && this.state.tiles.map(t=>
          <div>{`x: ${t.x}, y: ${t.y}, val: ${t.val} `}</div>
        )}</div>
        <div id="board-frame">
          <div id="board">
          	{
              board.map((line,x)=>
                line.map((cell,y)=>
                  <div className="cell" key={'cell' + x + y}>{x}{y}</div>
                )
              )
            }
            {
              this.state.tiles.map(tile=>
                <div className={`tile tile-${tile.val}`} key={`tile${tile.id}`} style={{top:tile.y*125, left:tile.x*125}}>{tile.val}</div>
              )
            }
          </div>
        </div>

      </main>
    )
  }
}

AppComponent.defaultProps = {
}

export default AppComponent
