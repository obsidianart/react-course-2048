require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'

let yeomanImage = require('../images/yeoman.png')

class AppComponent extends React.Component {
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
        <div id="board">
        	{
            board.map(line=>
              line.map(cell=>
                <div className="tile">&nbsp;</div>
              )
            )
          }
        </div>
      </main>
    )
  }
}

AppComponent.defaultProps = {
}

export default AppComponent
