require('normalize.css/normalize.css')
require('styles/App.scss')

import React from 'react'
import TileComponent from './TileComponent';

//let yeomanImage = require('../images/yeoman.png')

class AppComponent extends React.Component {
  handleKeyDown(event) {
    let { moveDown, moveLeft, moveRight, moveUp } = this.props.actions

    if (this.props.game.gameOver) return;

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

  startNewGame() {
    this.props.actions.newGame()
  }

  render() {
    let { board, tiles, score, gameOver } = this.props.game

    return (
      <main>
        <div id="info">This has teaching purpouse only(<a href="https://github.com/obsidianart/react-course-2048">code and info here</a>), if you want to play, <a href="https://gabrielecirulli.github.io/2048/" target="_blank">play the original</a></div>
        <header>
          <h1>2048</h1>
          <div id="restart" onClick={this.startNewGame.bind(this)}>
            RESTART
          </div>
          <div id="score-wrapper">
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
                <TileComponent tile={tile} key={`tile${tile.id}`}/>
              )
            }
            {gameOver && <div id="game-over">GAME OVER</div>}
          </div>

        </div>

      </main>
    )
  }
}

AppComponent.defaultProps = {
}

export default AppComponent
