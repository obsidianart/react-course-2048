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
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    let { board, tiles, score } = this.props.game

    return (
      <main>
        <header>
          <h1>2048</h1>
          <div className="score-wrapper">
            SCORE
            <div className="score">{score.toFixed()}</div>
          </div>
        </header>
        <div id="board-frame">
          <div id="board">
          	{
              board.map((line,x)=>
                line.map((cell,y)=>
                  <div className="cell" key={'cell' + x + y}>&nbsp;</div>
                )
              )
            }
            {
              tiles.sort((a,b)=>a.id-b.id).map(tile=>
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
