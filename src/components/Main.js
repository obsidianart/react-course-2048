require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'

//let yeomanImage = require('../images/yeoman.png')

class AppComponent extends React.Component {
  render() {
    let board = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]

    let tiles = [
      {x:2, y:2, val:2},
      {x:0, y:0, val:4}
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
              tiles.map(tile=>
                <div className={`tile tile-${tile.val}`} key={`tile${tile.x}${tile.y}`} style={{top:tile.x*125, left:tile.y*125}}>{tile.val}</div>
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
