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
    // let lastAvailablePosition = {}
    // let sortedRow = row.sort((tileA, tileB) => tileA.x>tileB.x)
    // sortedRow.map((tile,index) =>
    //   Object.assign(tile, {x: index})
    // )
    // [2,1,0].map((index) => {

    // })
            // .map(tile => 
            //   Object.assign(tile, {x: 3})
            // )

        // let lastAvailablePosition = {}
    return row
            .sort((tileA, tileB) => tileA.x>tileB.x)
            .map((tile,index) =>
              Object.assign(tile, {x: 3-index})
            )
  }

  moveTilesRight(state) {
    let tiles = state.tiles
    console.log(this.moveRowRight(tiles.filter(tile => tile.y===0)))
    return {
      tiles: [
        ...this.moveRowRight(tiles.filter(tile => tile.y===0)),
        ...this.moveRowRight(tiles.filter(tile => tile.y===1)),
        ...this.moveRowRight(tiles.filter(tile => tile.y===2)),
        ...this.moveRowRight(tiles.filter(tile => tile.y===3))
      ]

      // state.tiles.map(tile =>
      //   Object.assign({},tile,{x:tile.x+1})
      // )
    }
  }

  handleKeyDown(event) {
    if (event.keyCode in KEY_DIRECTIONS) {
      event.preventDefault()
      this.setState(this.moveTilesRight)
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
