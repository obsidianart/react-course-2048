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
        {x:2, y:2, val:2, id:1},
        {x:0, y:0, val:4, id:2}
      ]
    }
  }

  moveTilesRight(state) {
    return {
      tiles:state.tiles.map(tile =>
        Object.assign({},tile,{y:tile.y+1})
      )
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
                <div className={`tile tile-${tile.val}`} key={`tile${tile.id}`} style={{top:tile.x*125, left:tile.y*125}}>{tile.val}</div>
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
