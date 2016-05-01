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
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     tiles: [
  //       {x:1, y:0, val:2, id:1},
  //       {x:0, y:0, val:4, id:2},

  //       {x:0, y:1, val:2, id:3},
  //       {x:2, y:1, val:2, id:4},

  //       {x:0, y:2, val:2, id:5},
  //       {x:2, y:2, val:2, id:6},
  //       {x:3, y:2, val:2, id:7},


  //       {x:0, y:3, val:2, id:10},
  //       {x:1, y:3, val:2, id:11},
  //       {x:2, y:3, val:2, id:12},
  //       {x:3, y:3, val:2, id:13}
  //     ]
  //   }
  // }

  moveLine(direction, line) {
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

  moveTiles(direction, state) {
    let tiles = state.tiles
    let getLine = index => {
      if (~['LEFT','RIGHT'].indexOf(direction)) {
        return tiles.filter(tile => tile.y===index)
      }
      return tiles.filter(tile => tile.x===index)
    }
    return {
      tiles: [
        ...this.moveLine(direction, getLine(0)),
        ...this.moveLine(direction, getLine(1)),
        ...this.moveLine(direction, getLine(2)),
        ...this.moveLine(direction, getLine(3))
      ]
    }
  }

  handleKeyDown(event) {
    if (event.keyCode in KEY_DIRECTIONS) {
      event.preventDefault()
      let direction = KEY_DIRECTIONS[event.keyCode]
      this.setState(this.moveTiles.bind(this, direction))
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    let { board, tiles } = this.props.game

    return (
      <main>
        <h1>2048</h1>
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
              tiles.map(tile=>
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
