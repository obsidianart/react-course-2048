'use strict';

import React from 'react'

require('styles//Tile.scss')

class TileComponent extends React.Component {
  render() {
  	let {tile} = this.props
  	let tileClasses = 'tile'
  	tileClasses += ` tile-${tile.val}`
  	tileClasses += tile.merged?' merged':''
  	tileClasses += tile.new?' new':''

    return (
      <div
      	className={tileClasses}
      	style={{top:tile.y*125, left:tile.x*125}}
      >{tile.val}</div>
    );
  }
}

//TileComponent.displayName = 'TileComponent';

// Uncomment properties you need
// TileComponent.propTypes = {};
// TileComponent.defaultProps = {};

export default TileComponent;
