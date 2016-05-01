require('normalize.css/normalize.css')
require('styles/App.scss')

import React from 'react'

//let yeomanImage = require('../images/yeoman.png')

class AppComponent extends React.Component {

  handleKeyDown(event) {
    let { moveDown, moveLeft, moveRight, moveUp } = this.props.actions
    const KEY_DIRECTIONS = {
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN'
    }

    if (event.keyCode in KEY_DIRECTIONS) {
      event.preventDefault()
      let direction = KEY_DIRECTIONS[event.keyCode]
      switch(direction){
        case 'LEFT':  return moveLeft()
        case 'UP':    return moveUp()
        case 'RIGHT': return moveRight()
        case 'DOWN':  return moveDown()
      }

      //this.setState(this.moveTiles.bind(this, direction))
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
